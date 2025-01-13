import Button from "./Button";
import Footer from "./Footer";
import { useState } from 'react';
function Event({event}){
    const[accepted,setAccepted]=useState(false);
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
            <div style={{display:"flex",justifyContent:"center"}}>
            <Button text={accepted?"Cancel" : "Accept"} onClick={changeAcceptStatus}/>
            </div>
        </div>
    )
};
export default Event;