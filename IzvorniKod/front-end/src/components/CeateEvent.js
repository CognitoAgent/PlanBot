import { useState } from 'react';
import FormHeader from "./FormHeader";
import FormElement from "./FormElement";
function CreateEvent() {
    const [inputs, setInputs] = useState({})
    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({ ...inputs, [name]: value });
    }
    function handleEnter(e) {
        /*
        if (e.target.name === "Event Title") {
            document.getElementsByName('Date')[0].focus();
        }
            */
    }
    function handleSubmit(e){
        alert(inputs.date);
        e.preventDefault();
        fetch('http://localhost:8080/AdminPanel',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs)})
            .then(response => {
                if (response.ok) {
                    alert("Event created successfully!");
                } else {
                    /*
                    return response.json().then(data => {
                        throw new Error(data.message || "Creation failed");
                    });
                    */
                   throw new Error("Creation failed");
                }
            })
            .catch(er => alert(er.message));
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
            height: "520px",
            width: "90%"
        }}>
            <FormHeader heading="Create New Event" />
            <form onSubmit={handleSubmit} style={{
                padding: "0%",
                display: "flex",
                flexDirection: " column",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "20px",
                height: "400px"
            }}>
                <FormElement type="text"  name="title" display="Event Title" value={inputs.title} onChange={handleChange}
                     />
                <FormElement type="date" name="date" display="Pick a date" value={inputs.date}
                    style={{ height: "25px", width: "80px", marginLeft: "1%" }}
                    onChange={handleChange} />
                <FormElement type="text" name="location" display="Location" value={inputs.location} onChange={handleChange}
                     />
                <label style={{ display: "block" }}>
                    Description:

                    <textarea name="description" display="Description" value={inputs.description}
                        onChange={handleChange} style={{
                            width: "97%",
                            marginLeft: "auto",
                            marginRight: "auto",
                            display: "block",
                            marginTop: "6px",
                            height: "50px",
                            borderRadius: "4px"
                        }}>

                    </textarea>
                </label>
                <input type="submit" value="Create Event" style={{
                    boxSizing: "border-box",
                    marginTop: "2%",
                    paddingLeft: "5px",
                    borderRadius: "4px",
                    width: "100px",
                    height: "35px",
                    border: "1px solid black",
                    backgroundColor: "black",
                    color: "white"
                }} />
            </form>
        </div>
    );
}
export default CreateEvent;