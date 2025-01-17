import Button from "./EventComponents/Button";
import FormHeader from "./FormHeader";
import { useState } from "react";
function NewComment(){
     let eventInfo=JSON.parse(sessionStorage.getItem('event'));
    const [inputs, setInputs] = useState({    
        comment:"",
      id:eventInfo.id
   });
   function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({ ...inputs, [name]: value });
}
function handleSubmit(e) {
    e.preventDefault();

  
        //sessionStorage.setItem('event',JSON.stringify(inputs));
        //alert(sessionStorage.getItem('event'));
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
            //window.location.replace('eventlist');
            
    
}
return (
    <div style={{
        boxSizing: "border-box",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "2%",
        border: "1px solid black",
        borderRadius: "4px",
        backgroundColor: "white",
        height: "550px",
        width: "90%"
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
                height: "400px",
                marginBottom:"20px"
            }}
        >


                    <textarea 
                        name="description" 
                        value={inputs.description} // Controlled input
                        onChange={handleChange} 
                        style={{
                            width: "97%",
                            marginLeft: "auto",
                            marginRight: "auto",
                            display: "block",
                            marginTop: "6px",
                            height: "50px",
                            borderRadius: "4px"
                        }}
                    />
            <input 
                type="submit" 
                value="Propose change" 
                style={{
                    boxSizing: "border-box",
                    marginTop: "2%",
                   // paddingLeft: "5px",

                    borderRadius: "4px",
                    width: "110px",
                    height: "35px",
                    border: "1px solid black",
                    backgroundColor: "black",
                    color: "white",
                    fontSize:"medium"
                }} 
            />
        </form>
        <Button text="Event list" onClick={()=>window.location.replace('eventlist')}/>
    </div>
);

}
export default NewComment;