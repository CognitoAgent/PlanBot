import Button from "./components/EventComponents/Button";
import AdminEvent from "./components/AdminEvent";
import AdminUser from "./components/AdminUser";
import { useRef, useState } from 'react';
import { useEffect } from "react";
function Admin(){
    const token = sessionStorage.getItem("token");
        
    if(token===null){
        window.location.replace('/login');
    }
    const[selected,setSelected]=useState("Events");
    const [view,setView]=useState([]);
    
    useEffect(()=>{
       if(token===null)return;
        fetch('https://ec2-52-30-64-126.eu-west-1.compute.amazonaws.com:8443/admin', {
            method: 'POST',
            headers: { 
                'Content-Type': 'text/plain', 
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
               temp=temp.map(v => {
                if(selected==="Events") return <AdminEvent event={v} key={v.id}/>
                return <AdminUser user={v} key={v.id}/>
               })
                setView(temp);
                })
                .catch(error => alert(error.message));
            
           
    },[selected]);
   
    function handleChange(event){
        setSelected(event.target.value);
    }


        return(
        <>
        <div style={{width:"1166px", marginLeft:"auto", marginRight:"auto"}}>
            
            <input type="radio" id="Events" name="Events" value="Events" checked={selected==="Events"} onChange={handleChange}></input> 
            <label for="Events">Events</label><br></br>
            <input type="radio" id="Users" name="Users" value="Users" checked={selected==="Users"} onChange={handleChange}></input> 
            <label for="Users">Users</label><br></br>
           
        </div>
        <div style={{width:"1166px", marginLeft:"auto", marginRight:"auto", marginTop:"10px"}}>
        <Button text="My Events" onClick={()=>window.location.replace('publishedevents')} style={{marginRight:"20px"}}/>
        <Button text="Event List" onClick={()=>window.location.replace('eventlist')} style={{marginRight:"20px"}}/>
        <Button text="New Event" onClick={()=>window.location.replace('adminpanel')} style={{marginRight:"20px"}}/>
        </div>
        <div style={{ display:"flex",flexWrap:"wrap",alignItems:"flex-start",  gap:"40px",padding:"0%",   height: view.length>=9?"80vh" : "50vh", width:"1166px", marginLeft:"auto",marginRight:"auto"}}>
            {view}
        </div>
        </>
    )
       


};
export default Admin;

