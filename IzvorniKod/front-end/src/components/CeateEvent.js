import { useState } from 'react';
import FormHeader from "./FormHeader";
import FormElement from "./FormElement";
import Button from './EventComponents/Button';
import checkForAdmin from './checkForAdmin';

function CreateEvent() {
    // Initialize inputs with default values
    const [inputs, setInputs] = useState({
        title: "",        // Default to an empty string for controlled behavior
        date: "",         // Default to an empty string (dates can be strings)
        location: "",     // Default to an empty string
        description: "",  // Default to an empty string
    });

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({ ...inputs, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        //if(e.value!=='Create Event')return;
        // Validate each field
        if (!inputs.title.trim()) {
            alert('Please enter an event title');
            document.getElementsByName('title')[0].focus();
        } else if (!inputs.date.trim()) {
            alert('Please select a date');
            document.getElementsByName('date')[0].focus();
        } else if (!inputs.location.trim()) {
            alert('Please enter a location');
            document.getElementsByName('location')[0].focus();
        } else {
            
            const token = sessionStorage.getItem("token");
           
            fetch('https://ec2-52-30-64-126.eu-west-1.compute.amazonaws.com:8443/AdminPanel', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(inputs),
            })
                .then(response => {
                    if (response.ok) {
                        alert("Event created successfully!");
                    } else {
                        throw new Error("Creation failed");
                    }
                })
                .catch(error => alert(error.message));
        }
    }

    return (
        <div>
            <div style={{
            boxSizing: "border-box",
            marginLeft: "auto",
            marginRight: "auto",
           marginBottom:"20px",
            width: "90%"
        }}>
        <Button text="Event list" onClick={()=>window.location.replace('eventlist')} style={{marginRight:"20px"}}/>
        <Button text="My Events" onClick={()=>window.location.replace('publishedevents')} style={{marginRight:"20px"}}/>
        <Button text="Admin view" onClick={()=>checkForAdmin()} style={{marginRight:"20px"}}/>
        </div>
        <div style={{
            boxSizing: "border-box",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "2%",
            border: "1px solid black",
            borderRadius: "4px",
            backgroundColor: "white",
            height: "500px",
            width: "90%"
        }}>
            <FormHeader heading="Create New Event" />
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
                <FormElement 
                    type="text" 
                    name="title" 
                    display="Event Title" 
                    value={inputs.title} // Controlled input
                    onChange={handleChange}
                />
                <FormElement 
                    type="date" 
                    name="date" 
                    display="Pick a date" 
                    value={inputs.date} // Controlled input
                    style={{ height: "25px", width: "120px", marginLeft: "1%", textAlign: "center" }}
                    onChange={handleChange} 
                />
                <FormElement 
                    type="text" 
                    name="location" 
                    display="Location" 
                    value={inputs.location} // Controlled input
                    onChange={handleChange}
                />
                <label style={{ display: "block" }}>
                    Description:
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
                </label>
                <input 
                    type="submit" 
                    value="Create Event" 
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
            
        </div>
        </div>
    );
}

export default CreateEvent;
