//stranica za dodavanje novog komentara
import Button from "./EventComponents/Button";
import FormHeader from "./FormHeader";
import { useState } from "react";
import checkForAdmin from "./checkForAdmin";
function NewComment(){
    const [inputs, setInputs] = useState({    
        comment:"",
      id:0
   });
    //provjera je li korisnik prijavljen
    const token = sessionStorage.getItem("token");
if(token===null){
    window.location.replace('/login');
}
    //provjera jesu li podatci o događaju za koji se dodaje komentar dostupni u memoriji
     let eventInfo=JSON.parse(sessionStorage.getItem('event'));
     if(eventInfo===null){
        window.location.replace('eventlist');
    }
    else{
        
        if(inputs.id===0)setInputs({comment:"", id:eventInfo.id});
      
    }

   function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    alert(e.target.name);
    alert(e.target.value);
    setInputs({ ...inputs, [name]: value });
    alert("uspijeh");
}
function handleSubmit(e) {
    e.preventDefault();
    //komentar i id događaja se šalju na server
        const token = sessionStorage.getItem("token");
        fetch('https://ec2-52-30-64-126.eu-west-1.compute.amazonaws.com:8443/addcomment', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(inputs),
        })
            .then(response => {
                if (response.ok) {
                    alert("Comment added successfully!");
                } else {
                    throw new Error("Sending comment failed");
                }
            })
            .catch(error => alert(error.message));
}

return (
    <div>
        <div style={{width:"80%", marginLeft:"auto", marginRight:"auto", marginTop:"10px", marginBottom:"20px"}}>
         <h1>New Comment</h1>
        <Button text="Event List" onClick={()=>window.location.replace('eventlist')} style={{marginRight:"20px"}}/>
        <Button text="My Events" onClick={()=>window.location.replace('publishedevents')} style={{marginRight:"20px"}}/>
        <Button text="Admin view" onClick={()=>checkForAdmin()} style={{marginRight:"20px"}}/>
        </div>
    
    <div style={{
        boxSizing: "border-box",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "18px",
        border: "1px solid black",
        borderRadius: "4px",
        backgroundColor: "white",
        height: "250px",
        width: "80%"
    }}>
        <FormHeader heading="Add comment" />
        <form 
            onSubmit={handleSubmit} 
            style={{
                padding: "0%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "20px",
                height: "150px",
                marginBottom:"20px"
            }}
        >


                    <textarea 
                        name="comment" 
                        value={inputs.comment} 
                        onChange={handleChange} 
                        style={{
                            width: "97%",
                            marginLeft: "auto",
                            marginRight: "auto",
                            display: "block",
                            marginTop: "6px",
                            height: "70px",
                            borderRadius: "4px"
                        }}
                    />
            <input 
                type="submit" 
                value="Add comment" 
                style={{
                    boxSizing: "border-box",
                    marginTop: "2%",
                    marginBottom:"2%",

                    borderRadius: "4px",
                    width: "130px",
                    height: "40px",
                    border: "1px solid black",
                    backgroundColor: "black",
                    color: "white",
                    fontSize:"medium"
                }} 
            />
        </form>
        
    </div>
    </div>
);

}
export default NewComment;