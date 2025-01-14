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
        fetch('https://ec2-52-30-64-126.eu-west-1.compute.amazonaws.com:8443/showpropositions', {
            method: 'POST',
            headers: { 
                'Content-Type': 'text/plain', 
                'Authorization': `Bearer ${token}` 
            },
            body: event.id,
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
            sessionStorage.setItem('propositions',JSON.stringify(r));
            window.location.replace('propositions');
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
        fetch('https://ec2-52-30-64-126.eu-west-1.compute.amazonaws.com:8443/acceptstatus', {
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
            .then(()=>window.location.reload())
            .catch(error => alert(error.message));       
    }

    function openGoogleMaps() {
        const query = encodeURIComponent(event.location);
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
        window.open(googleMapsUrl, '_blank');
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
            <Button text="Google Maps" onClick={openGoogleMaps} />
            </div>
        </div>
    )
};
export default Event;