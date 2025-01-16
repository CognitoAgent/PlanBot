import React, { useState, useEffect } from 'react';
import Button from "./components/EventComponents/Button";

function PublishedEvents() {
    const [publishedEvents, setPublishedEvents] = useState([]);
    const [noPostsMessage, setNoPostsMessage] = useState("");
    const token = sessionStorage.getItem("token");

    const fetchPublishedEvents = () => {
        fetch('https://ec2-52-30-64-126.eu-west-1.compute.amazonaws.com:8443/publishedevents', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ type: token })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 204) {
                return []; // No content but return an empty array
            } else {
                throw new Error("Loading published events is not possible");
            }
        })
        .then(data => {
            console.log("Fetched data:", data);
            if (data === null || data.length === 0) {
                setPublishedEvents([]);
                setNoPostsMessage("There are no published posts");
            } else {
                setPublishedEvents(data); // Ensure all events are set
                setNoPostsMessage("");
            }
        })
        .catch(error => {
            console.error("Error fetching events:", error);
            setPublishedEvents([]);
            setNoPostsMessage("Error loading published events");
        });
    };


    useEffect(() => {
        if (!token) {
            window.location.replace('/login');
        } else {
            fetchPublishedEvents();
        }
    }, [token]);

    const deletePost = (postId) => {
        fetch(`https://ec2-52-30-64-126.eu-west-1.compute.amazonaws.com:8443/deletedevents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: postId
        })
        .then(response => {
            if (response.ok) {
                alert("Post deleted successfully!");
                setPublishedEvents(publishedEvents.filter(event => event.id !== postId));
            } else {
                throw new Error("Failed to delete the post");
            }
        })
        .catch(error => {
            console.error("Error deleting the post:", error);
            alert("Error deleting the post");
        });
    };

    return (
        <>
            <div style={{ width: "1166px", marginLeft: "auto", marginRight: "auto" }}>
                <h1>Published Events</h1>
            </div>

            <div style={{ width: "1166px", marginLeft: "auto", marginRight: "auto", marginTop: "10px" }}>
                <Button text="Other events" onClick={() => window.location.replace('eventlist')} />
            </div>

            <div style={{ width: "1166px", marginLeft: "auto", marginRight: "auto", marginTop: "10px" }}>
                <Button text="New event" onClick={() => window.location.replace('newevent')} />
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
                {publishedEvents.length > 0 ? (
                    publishedEvents.map((event, index) => (
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
                            <button 
                                onClick={() => deletePost(event.id)} 
                                style={{
                                    marginTop: "10px",
                                    padding: "8px 12px",
                                    backgroundColor: "#ff4d4d",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer"
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <div style={{ width: "100%", textAlign: "center" }}>{noPostsMessage}</div>
                )}
            </div>
        </>
    );
}

export default PublishedEvents;
