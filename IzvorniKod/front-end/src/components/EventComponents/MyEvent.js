import Button from "./Button";
import Footer from "./Footer";
import { useState } from 'react';
function MyEvent({event}){
     function changeEventInfo(){
        sessionStorage.setItem('event', JSON.stringify(event));
         window.location.replace('changeEvent');
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
            <Button text="Change" onClick={changeEventInfo}/>
            </div>
        </div>
    )
};
export default MyEvent;