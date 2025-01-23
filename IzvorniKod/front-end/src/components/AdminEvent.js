//prikazuje podatke o događaju i sadrži opciju brisanja koja je dostupna samo adminu
import Button from "./EventComponents/Button";
import { useState } from "react";
function AdminEvent({ event }) {
  function deleteEvent(){
    //na server se šalje id eventa kojeg se želi obrisati
    const token=sessionStorage.getItem('token');
    fetch(`https://ec2-52-30-64-126.eu-west-1.compute.amazonaws.com:8443/adminPost`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: event.id
  })
    .then(response =>{
        if(response.ok){
            alert("Event deleted!")
        }
        else{
            throw new Error("Deleting not possible")
        }
    })
    .then(()=>window.location.reload())
    .catch(e => alert(e.message));
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "300px",
        marginTop: "20px",
        minHeight: "200px",
        border: "1px solid black",
        borderRadius: "4px",
        backgroundColor: "white",
        padding: "30px",
      }}
    >
      <h3 style={{ margin: "0px" }}>{event.title}</h3>
      <div>
        <p>{event.date}</p>
        <p>{event.location}</p>
        <p>{event.description}</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Button text="Delete" onClick={deleteEvent}/>
       
      </div>
      
    </div>
  );
}
export default AdminEvent;
