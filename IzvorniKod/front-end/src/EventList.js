import Button from "./components/EventComponents/Button";
import Event from "./components/EventComponents/Event";
import MyEvent from "./components/EventComponents/MyEvent";
import { useRef, useState } from 'react';
import { useEffect } from "react";
let dog={date:"20/02/2025",location:"FER",description:"Sastanak na FER-u", title:"Sastanak", id:1};
function dataPromise(){
    return new Promise((resolve,reject) =>{
        let a=[dog,{date:"20/02/2026",location:"FER",description:"Sastanak na FER-u", title:"Sastanak", id:2}];
        setTimeout(()=>resolve(JSON.stringify(a)),2000);
    })
}
function EventList(){
    const[selected,setSelected]=useState("My events");
    const events=useRef([<Event event={dog}/>,<Event event={dog}/>,<Event event={dog}/>,<Event event={dog}/>,<Event event={dog}/>,<Event event={dog}/>]);
    useEffect(()=>{

       alert("useEffect");
           
         /*
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
                */
               dataPromise()
               .then(r=>{alert("Poslano");return JSON.parse(r)})
            .then(r => {
               
               let temp=r;
                alert("Duljina niza unutar useEffecta je " + events.current.length + ", a r je "+ r.length);
  
                temp.map(e => {
                    alert("Pretvaram u evente");
                    let tempdog={date:"20/02/2025",location:"FER",description:"Sastanak na FER-u", title:"Sastanak"};
                    /*
                    tempdog.title=e.title;
                    tempdog.date=e.date;
                    tempdog.id=e.id;
                    tempdog.description=e.description;
                    tempdog.location=e.location;
                    */
                    if(selected==="My events"){
                        return <MyEvent event={tempdog} key={e.id}/>
                    }
                    return <Event event={tempdog} key={e.id}/>
                });
                events.current=temp;
                if(selected==="My events")setSelected("Other events");
                })
                .catch(error => alert(error.message));
            
           
    },[]);
   
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
        /*
        if(token===null){
            window.location.replace('/login');
        }
            */
        alert("Izvan useEffecta duljina je " +events.current.length + ", a stanje je " + selected);
        alert(typeof events.current[0]);
        return (<div>{events.current.length>1?events.current : events.current}</div>)
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
        <div style={{ display:"flex",flexWrap:"wrap",alignItems:"flex-start",  gap:"40px",padding:"0%",   height: events.current.length>=9?"80vh" : "50vh", width:"1166px", marginLeft:"auto",marginRight:"auto"}}>
            {events.current}
        </div>
        </>
    )
       


};
export default EventList;

//
