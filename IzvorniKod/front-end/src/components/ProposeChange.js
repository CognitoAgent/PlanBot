//stranica za dodavanje prijedloga o promijeni lokacije i datuma događaja
import { useState } from 'react';
import FormHeader from './FormHeader';
import FormElement from "./FormElement";
import Button from './EventComponents/Button';
import checkForAdmin from './checkForAdmin';
function ProposeChange() {
    //provjera je li korisnik prijavljen
        const token =sessionStorage.getItem('token');
    if(token===null){
        window.location.replace('/login');
    }

    //provjera jesu li podatci o događaju spremljeni
    let eventInfo=JSON.parse(sessionStorage.getItem('event'));
    if(eventInfo===null){
        window.location.replace('eventlist');
    }
 
    const [inputs, setInputs] = useState({    
        date: eventInfo.date,         
        location: eventInfo.location,     
        id:eventInfo.id
    });

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({ ...inputs, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        //provjera jesu li valjano uneseni podatci
        if (!inputs.date.trim()) {
            alert('Please select a date');
            document.getElementsByName('date')[0].focus();
        } else if (!inputs.location.trim()) {
            alert('Please enter a location');
            document.getElementsByName('location')[0].focus();
        } else {
            //podatci se šalju na server
            const token = sessionStorage.getItem("token");
            fetch('https://ec2-52-30-64-126.eu-west-1.compute.amazonaws.com:8443/proposechange', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(inputs),
            })
                .then(response => {
                    if (response.ok) {
                        alert("Change proposed successfully!");
                    } else {
                        throw new Error("Sending propose failed");
                    }
                })
                .catch(error => alert(error.message));
                
        }
    }

    return (
        <div>
        <div style={{width:"80%", marginLeft:"auto", marginRight:"auto", marginTop:"10px", marginBottom:"20px"}}>
         <h1>Propose Change</h1>
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
            height: "320px",
            width: "80%"
        }}>
            <FormHeader heading="Propose change" />
            <form 
                onSubmit={handleSubmit} 
                style={{
                    padding: "0%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: "20px",
                    height: "220px",
                    marginBottom:"20px"
                }}
            >

                <FormElement 
                    type="date" 
                    name="date" 
                    display="Pick a date" 
                    value={inputs.date} 
                    style={{ height: "25px", width: "120px", marginLeft: "1%", textAlign: "center" }}
                    onChange={handleChange} 
                />
                <FormElement 
                    type="text" 
                    name="location" 
                    display="Location" 
                    value={inputs.location} 
                    onChange={handleChange}
                />
                <input 
                    type="submit" 
                    value="Propose change" 
                    style={{
                        boxSizing: "border-box",
                        marginTop: "2%",
                        marginBottom:"2%",
                        borderRadius: "4px",
                        width: "150px",
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

export default ProposeChange;