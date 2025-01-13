import Button from "./components/EventComponents/Button";
import Event from "./components/EventComponents/Event";
import MyEvent from "./components/EventComponents/MyEvent";
import { useRef, useState } from 'react';
import { useEffect } from "react";
function EventList(){
    const[selected,setSelected]=useState("All events");
    const [events,setEvents]=useState([]);
    useEffect(()=>{
       // alert(selected);
        fetch('https://52.213.213.5:8443/eventlist', {
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
  /*
                
                temp=temp.map(e => {
               
                    if(selected==="Accepted events"){
                       // alert("selected je " + selected);
                        return <MyEvent event={e} key={e.id}/>
                    }
                  //  alert("Ovdje je selected "+selected)
                    return <Event event={e} key={e.id}/>
                });
            */
                setEvents(temp);
              
              
                })
                .catch(error => alert(error.message));
            
           
    },[selected]);
   
    function handleChange(event){
        setSelected(event.target.value);
    }
    /*
    let dog={date:"20/02/2025",location:"FER",description:"Sastanak na FER-u", title:"Sastanak"};
    let events=[<Event event={dog}/>,<Event event={dog}/>,<Event event={dog}/>,<Event event={dog}/>,<Event event={dog}/>,<Event event={dog}/>
    
        ,<Event event={dog}/>,<Event event={{date:"20/02/2025",location:"FER",description:"Sastanak na FER-u", title:"Sastanak"}}/>,<Event event={dog}/>,<Event event={dog}/>,<Event event={dog}/>,<Event event={dog}/>,<Event event={dog}/>,<Event event={dog}/>];
        let myEvents=[<MyEvent event={dog}/>,<MyEvent event={dog}/>,<MyEvent event={dog}/>,<MyEvent event={dog}/>,<MyEvent event={dog}/>,<MyEvent event={dog}/>]
        */

        const token = sessionStorage.getItem("token");
        
        if(token===null){
            window.location.replace('/login');
        }
            

  // alert("Izvan useeffecta odabran je "+selected)
        return(
        <>
        <div style={{width:"1166px", marginLeft:"auto", marginRight:"auto"}}>
            
            <input type="radio" id="acceptedEvents" name="eventSelection" value="Accepted events" checked={selected==="Accepted events"} onChange={handleChange}></input> 
            <label for="myEvents">Accepted events</label><br></br>
            <input type="radio" id="allEvents" name="eventSelection" value="All events" checked={selected==="All events"} onChange={handleChange}></input> 
            <label for="allEvents">All events</label><br></br>
           
        </div>
        <div style={{width:"1166px", marginLeft:"auto", marginRight:"auto", marginTop:"10px"}}>
        <Button text="New Event" onClick={()=>window.location.replace('adminpanel')}/>
        </div>
    <div style={{ width: "1166px", marginLeft: "auto", marginRight: "auto", marginTop: "10px" }}>
                <Button text="My events" onClick={() => window.location.replace('publishedevents')} />
            </div>
        <div style={{ display:"flex",flexWrap:"wrap",alignItems:"flex-start",  gap:"40px",padding:"0%",   height: events.length>=9?"80vh" : "50vh", width:"1166px", marginLeft:"auto",marginRight:"auto"}}>
            {events}
        </div>
        </>
    )
       


};
export default EventList;

//
