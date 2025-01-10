import React, { useState, useEffect } from 'react';
import Button from "./components/EventComponents/Button";

function PublishedEvents() {
    const [publishedEvents, setPublishedEvents] = useState([]);
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            window.location.replace('/login');
        } else {
            fetchPublishedEvents();
        }
    }, []);

    const fetchPublishedEvents = () => {
        fetch('https://52.213.213.5:8443/publishedevents', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 204) {
                return null; // No content
            } else {
                throw new Error("Loading published events is not possible");
            }
        })
        .then(data => {
            if (data === null || (Array.isArray(data) && data.length === 0)) {
                setPublishedEvents([]);
                setNoPostsMessage("There are no published posts");
            } else {
                setPublishedEvents(data);
                setNoPostsMessage("");
            }
        })
        .catch(error => {
            alert(error.message);
            setPublishedEvents([]);
            setNoPostsMessage("Error loading published events");
    });

    return (
        <>
            <div style={{ width: "1166px", marginLeft: "auto", marginRight: "auto" }}>
                <h1>Published Events</h1>
            </div>

            <div style={{ width: "1166px", marginLeft: "auto", marginRight: "auto", marginTop: "10px" }}>
                <Button text="Other events" onClick={() => window.location.replace('eventlist')} />
            </div>

            <div style={{ 
                display: "flex", 
                flexWrap: "wrap", 
                alignItems: "flex-start", 
                gap: "40px", 
                padding: "0%", 
                height: publishedEvents.length >= 9 ? "80vh" : "50vh", 
                width: "1166px", 
                marginLeft: "auto", 
                marginRight: "auto" 
            }}>
                {publishedEvents.map((event, index) => (
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

export default PublishedEvents;

