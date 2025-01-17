import Button from "./EventComponents/Button";
import { useState } from "react";
function AdminUser({ user }) {
  function deleteUser(){
    const token =sessionStorage.getItem('token');
    fetch(`https://ec2-52-30-64-126.eu-west-1.compute.amazonaws.com:8443/adminUser`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: user.id
  })
    .then(response =>{
        if(response.ok){
            alert("User deleted!")
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
        minHeight: "100px",
        border: "1px solid black",
        borderRadius: "4px",
        backgroundColor: "white",
        padding: "30px",
      }}
    >
      
      <div>
        <p>User name: {user.username}</p>
        <p>e-mail address: {user.emailAddress}</p>
        <p>{user.id}</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Button text="Delete" onClick={deleteUser} />
       
      </div>
      
    </div>
  );
}
export default AdminUser;
