import Button from "./components/EventComponents/Button";
import Event from "./components/EventComponents/Event";
import MyEvent from "./components/EventComponents/MyEvent";
import { useRef, useState } from 'react';
import { useEffect } from "react";
function EventList(){
    const[selected,setSelected]=useState("All events");
    const [events,setEvents]=useState([]);
    useEffect(()=>{
        fetch('https://ec2-52-30-64-126.eu-west-1.compute.amazonaws.com:8443/eventlist', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            },
            body: selected
        })
            .then(response => {
                if (response.ok) {
                   return response.json();
                } else {
                    throw new Error("Loading events is not possible");
                }
            })
            .then(r => { 
               let temp=r;
               temp=temp.map(e => {
                return <Event event={e} key={e.id}/>
               })
                setEvents(temp);
              
              
                })
                .catch(error => alert(error.message));
    },[selected]);
   
    function handleChange(event){
        setSelected(event.target.value);
    }
        const token = sessionStorage.getItem("token");
        
        if(token===null){
            window.location.replace('/login');
        }
        return(
            <div style={{
                backgroundColor: "whitesmoke",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height:"100vh",
                width:"100vw"
            }}
            >
        <div style={{width:"1166px", marginLeft:"auto", marginRight:"auto"}}>
            
            <input type="radio" id="acceptedEvents" name="eventSelection" value="Accepted events" checked={selected==="Accepted events"} onChange={handleChange}></input> 
            <label for="myEvents">Accepted events</label><br></br>
            <input type="radio" id="allEvents" name="eventSelection" value="All events" checked={selected==="All events"} onChange={handleChange}></input> 
            <label for="allEvents">All events</label><br></br>
           
        </div>
        <div style={{width:"1166px", marginLeft:"auto", marginRight:"auto", marginTop:"10px"}}>
        <Button text="New Event" onClick={()=>window.location.replace('adminpanel')} style={{marginRight:"20px"}}/>
        <Button text="My Events" onClick={()=>window.location.replace('publishedevents')} style={{marginRight:"20px"}}/>
        <Button text="Admin view" onClick={()=>window.location.replace('adminview')} style={{marginRight:"20px"}}/>
        </div>
        <div style={{ display:"flex",flexWrap:"wrap",alignItems:"flex-start",  gap:"40px",padding:"0%",   height: events.length>=9?"80vh" : "50vh", width:"1166px", marginLeft:"auto",marginRight:"auto"}}>
            {events}
        </div>
        </div>
    )
};
export default EventList;


