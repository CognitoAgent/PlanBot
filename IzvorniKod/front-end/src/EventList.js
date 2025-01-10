import Button from "./components/EventComponents/Button";
import Event from "./components/EventComponents/Event";
import MyEvent from "./components/EventComponents/MyEvent";
import { useState, useEffect } from 'react';

function EventList() {
    const [selected, setSelected] = useState("My events");
    const [events, setEvents] = useState([]); // State to store posts

    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            window.location.replace('/login');
        } else {
            alert(token);
            fetch('https://52.213.213.5:8443/eventlist', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ type: selected }) // Adjust if the backend expects JSON
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Loading events is not possible");
                    }
                })
                .then(data => setEvents(data)) // Update the state with fetched posts
                .catch(error => alert(error.message));
        }
    }, [selected]); // Re-fetch posts when `selected` changes

    function handleChange(event) {
        setSelected(event.target.value);
    }

    return (
        <>
            <div style={{ width: "1166px", marginLeft: "auto", marginRight: "auto" }}>
                <input 
                    type="radio" 
                    id="myEvents" 
                    name="eventSelection" 
                    value="My events" 
                    checked={selected === "My events"} 
                    onChange={handleChange} 
                />
                <label htmlFor="myEvents">Other events</label><br />
                <input 
                    type="radio" 
                    id="otherEvents" 
                    name="eventSelection" 
                    value="Other events" 
                    checked={selected === "Other events"} 
                    onChange={handleChange} 
                />
                <label htmlFor="otherEvents">Joined events</label><br />
            </div>

            <div style={{ width: "1166px", marginLeft: "auto", marginRight: "auto", marginTop: "10px" }}>
                <Button text="New Event" onClick={() => window.location.replace('adminpanel')} />
            </div>

            <div style={{ width: "1166px", marginLeft: "auto", marginRight: "auto", marginTop: "10px" }}>
                <Button text="My Events" onClick={() => window.location.replace('publishedevents')} />
            </div>

            <div style={{ 
                display: "flex", 
                flexWrap: "wrap", 
                alignItems: "flex-start", 
                gap: "40px", 
                padding: "0%", 
                height: events.length >= 9 ? "80vh" : "50vh", 
                width: "1166px", 
                marginLeft: "auto", 
                marginRight: "auto" 
            }}>
                {/* Render each post inside a div */}
                {events.map((event, index) => (
                    <div key={index} style={{
                        border: "1px solid #ccc", 
                        borderRadius: "8px", 
                        padding: "16px", 
                        width: "calc(33.33% - 20px)", 
                        boxSizing: "border-box",
                        backgroundColor: "#f9f9f9"
                    }}>
                        <h3>{event.title}</h3>
                        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p><strong>Description:</strong> {event.description}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default EventList;
