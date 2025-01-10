import Button from "./components/EventComponents/Button";
import Event from "./components/EventComponents/Event";
import MyEvent from "./components/EventComponents/MyEvent";
import { useState } from 'react';
import { useEffect } from "react";
function EventList(){
    const[selected,setSelected]=useState("My events");
    let events=[];
    useEffect(()=>{
        const token = sessionStorage.getItem("token");
        if(token===null){
            window.location.replace('/login');
        }
        else{
            alert(token);
            
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
                alert("Krećem u obradu odgovora");
                events=r;
                alert("Duljina niza je" + events.length);
                let i=0;
                for(i=0;i<events.length;i++){
                    alert("Naslov je" + events[i].title);
                    alert(events[i].location);
                }
                alert("Gotova obrada odgovora");
                events.map(e => {
                    if(selected==="My events"){
                        return <MyEvent event={e}/>
                    }
                    return <Event event={e}/>
                });
                
                for(i=0;i<events.length;i++){
                    alert(events[i].title);
                    alert(events[i].location);
                }
                })
                .catch(error => alert(error.message));
            }

    })
   
    function handleChange(event){
        setSelected(event.target.value);
    }
    /*
    let dog={date:"20/02/2025",location:"FER",description:"Sastanak na FER-u", title:"Sastanak"};
    let events=[<Event event={dog}/>,<Event event={dog}/>,<Event event={dog}/>,<Event event={dog}/>,<Event event={dog}/>,<Event event={dog}/>
    
        ,<Event event={dog}/>,<Event event={{date:"20/02/2025",location:"FER",description:"Sastanak na FER-u", title:"Sastanak"}}/>,<Event event={dog}/>,<Event event={dog}/>,<Event event={dog}/>,<Event event={dog}/>,<Event event={dog}/>,<Event event={dog}/>];
        let myEvents=[<MyEvent event={dog}/>,<MyEvent event={dog}/>,<MyEvent event={dog}/>,<MyEvent event={dog}/>,<MyEvent event={dog}/>,<MyEvent event={dog}/>]
        */
       
        
        return(
        <>
        <div style={{width:"1166px", marginLeft:"auto", marginRight:"auto"}}>
            
            <input type="radio" id="myEvents" name="eventSelection" value="My events" checked={selected==="My events"} onChange={handleChange}></input> 
            <label for="myEvents">My events</label><br></br>
            <input type="radio" id="otherEvents" name="eventSelection" value="Other events" checked={selected==="Other events"} onChange={handleChange}></input> 
            <label for="otherEvents">Other events</label><br></br>
           
        </div>
        <div style={{width:"1166px", marginLeft:"auto", marginRight:"auto", marginTop:"10px"}}>
        <Button text="New Event" onClick={()=>window.location.replace('adminpanel')}/>
        </div>
    <div style={{ width: "1166px", marginLeft: "auto", marginRight: "auto", marginTop: "10px" }}>
                <Button text="My Events" onClick={() => window.location.replace('publishedevents')} />
            </div>
        <div style={{ display:"flex",flexWrap:"wrap",alignItems:"flex-start",  gap:"40px",padding:"0%",   height: events.length>=9?"80vh" : "50vh", width:"1166px", marginLeft:"auto",marginRight:"auto"}}>
            {events}
        </div>
        </>
    )
       


};
export default EventList;

//
