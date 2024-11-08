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
            <form style={{
                padding: "0%",
                display: "flex",
                flexDirection: " column",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "20px",
                height: "400px"
            }}>
                <FormElement type="text" name="Event Title" value={inputs["Event Title"]} onChange={handleChange}
                    onKeyDown={(e) => { if (e.key === "Enter") handleEnter(e) }} />
                <FormElement type="date" name="Date" display="Pick a date" value={inputs["Date"]}
                    style={{ height: "25px", width: "80px", marginLeft: "1%" }}
                    onChange={handleChange} onKeyDown={(e) => { if (e.key === "Enter") handleEnter(e) }} />
                <FormElement type="text" name="Location" value={inputs["Location"]} onChange={handleChange}
                    onKeyDown={(e) => { if (e.key === "Enter") handleEnter(e) }} />
                <label style={{ display: "block" }}>
                    Description:

                    <textarea name="Description" value={inputs["Description"]}
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