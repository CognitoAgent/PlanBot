import React, { useState, useEffect } from "react";
import Button from "./components/EventComponents/Button";

function PublishedEvents() {
  const [publishedEvents, setPublishedEvents] = useState([]);
  const [noPostsMessage, setNoPostsMessage] = useState("");
  const token = sessionStorage.getItem("token");

  // Function to fetch published events
  const fetchPublishedEvents = () => {
    fetch("https://52.213.213.5:8443/publishedevents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ type: token }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 204) {
          return null; // No content
        } else {
          throw new Error("Loading published events is not possible");
        }
      })
      .then((data) => {
        console.log("Fetched data:", data);
        if (data === null || (Array.isArray(data) && data.length === 0)) {
          setPublishedEvents([]);
          setNoPostsMessage("There are no published posts");
        } else {
          setPublishedEvents(data);
          setNoPostsMessage("");
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        alert(error.message);
        setPublishedEvents([]);
        setNoPostsMessage("Error loading published events");
      });
  };

  // Function to delete an event
  const deleteEvent = (eventId) => {
    fetch(`https://52.213.213.5:8443/publishedevents/${eventId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Event deleted successfully");
          // Remove the deleted event from the state
          setPublishedEvents((prevEvents) =>
            prevEvents.filter((event) => event.id !== eventId)
          );
        } else {
          throw new Error("Failed to delete the event");
        }
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        alert("Error deleting event");
      });
  };

  useEffect(() => {
    if (!token) {
      window.location.replace("/login");
    } else {
      fetchPublishedEvents();
    }
  }, [token, publishedEvents]); 

  return (
    <>
      <div style={{ width: "1166px", marginLeft: "auto", marginRight: "auto" }}>
        <h1>Published Events</h1>
      </div>

      <div
        style={{
          width: "1166px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "10px",
        }}
      >
        <Button
          text="Other events"
          onClick={() => window.location.replace("eventlist")}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          gap: "40px",
          padding: "0%",
          height: publishedEvents.length >= 9 ? "80vh" : "50vh",
          width: "1166px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {publishedEvents.length > 0 ? (
          publishedEvents.map((event, index) => (
            <div
              key={event.id || index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                width: "calc(33.33% - 20px)",
                boxSizing: "border-box",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3>{event.title}</h3>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(event.time).toLocaleDateString()}
              </p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Description:</strong> {event.description}
              </p>
              <button
                onClick={() => deleteEvent(event.id)}
                style={{
                  marginTop: "10px",
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div style={{ width: "100%", textAlign: "center" }}>
            {noPostsMessage}
          </div>
        )}
      </div>
    </>
  );
}

export default PublishedEvents;
