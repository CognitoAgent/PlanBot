import Button from "./Button";
import Footer from "./Footer";
import { useState } from 'react';
function Event({event}){
    const[accepted,setAccepted]=useState(event.accepted || false);
    function proposeChange(){
        sessionStorage.setItem('event',JSON.stringify(event));
        window.location.replace('proposechange');
    }
    function showPropositions(){
        const token = sessionStorage.getItem("token");
        fetch('https://52.213.213.5:8443/showpropositions', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({'id':event.id}),
        })
        .then(response =>{
            if(response.ok){
                return response.json()
            }
            else{
                throw new Error("Not possible to see propositions");
            }
        })
        .then(r =>{
            let i;
            for(i=0;i<r.length;i++){
                let message=(i+1)+"."+" proposition is:\n"+"Date: "+r[i].date+"\n"+ "Location: "+r[i].location;
                alert(message);
            }
        })
        .catch(error => alert(error.message));
    }
    function changeAcceptStatus(){
        if(accepted){
            //setAccepted(false);
            event.accepted=false;
        }
        else{
            //setAccepted(true);
            event.accepted=true;
        }
        const token = sessionStorage.getItem("token");
        fetch('https://52.213.213.5:8443/acceptstatus', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({'id':event.id, 'accepted':event.accepted}),
        })
            .then(response => {
                if (response.ok) {
                    if(event.accepted){
                        alert("Event accepted!");
                    }
                    else{
                        alert("Event canceled!");
                    }
                    setAccepted(event.accepted);
                    
                } 
                else {
                    event.accepted= !event.accepted;
                    throw new Error("Change not possible");
                }
            })
            .then(window.location.reload())
            .catch(error => alert(error.message));
           
            
    }
    
    return (
        <div style={{
            
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "300px",
            marginTop: "20px",
            minHeight: "200px",
            border: "1px solid black",
            borderRadius: "4px",
            backgroundColor: "white",
            padding:"30px",
            
        }}>
            <h3 style={{margin:"0px"}}>{event.title}</h3>
            <div>
                <p>{event.date}</p>
                <p>{event.location}</p>
                <p>{event.description}</p>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
            <Button text={accepted?"Cancel" : "Accept"} onClick={changeAcceptStatus}/>
            <Button text="Propose change" onClick={proposeChange} />
            <Button text="Show propositions" onClick={showPropositions}/>
            </div>
        </div>
    )
};
export default Event;