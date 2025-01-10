import React, { useState, useEffect } from "react";
import Button from "./components/EventComponents/Button";

function PublishedEvents() {
  const [publishedEvents, setPublishedEvents] = useState([]); // Stores events
  const [noPostsMessage, setNoPostsMessage] = useState(""); // Message if no events
  const token = sessionStorage.getItem("token"); // Retrieve token from session storage

  // Fetch events from the server
  const fetchPublishedEvents = () => {
    fetch("https://52.213.213.5:8443/publishedevents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ type: token }), // Pass the token in request body
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
        console.log("Fetched data:", data); // Debug fetched data
        if (!data || (Array.isArray(data) && data.length === 0)) {
          setPublishedEvents([]);
          setNoPostsMessage("There are no published posts");
        } else {
          setPublishedEvents(data);
          setNoPostsMessage(""); // Clear the message
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        alert(error.message);
        setPublishedEvents([]);
        setNoPostsMessage("Error loading published events");
      });
  };

  // Fetch events on component mount or when the token changes
  useEffect(() => {
    if (!token) {
      window.location.replace("/login"); // Redirect if no token
    } else {
      fetchPublishedEvents(); // Fetch events
    }
  }, [token]); // Dependency on `token` only

  return (
    <>
      {/* Header Section */}
      <div style={{ width: "1166px", marginLeft: "auto", marginRight: "auto" }}>
        <h1>Published Events</h1>
      </div>

      {/* Navigation Button */}
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

      {/* Events Display */}
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
              key={event.id || index} // Use unique key
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                width: "calc(33.33% - 20px)",
                boxSizing: "border-box",
                backgroundColor: "#f9f9f9",
              }}
            >
              {/* Event Details */}
              <h3>{event.title}</h3>
              <p>
                <strong>Date:</strong>{" "}
                {event.time
                  ? new Date(event.time).toLocaleDateString()
                  : "No date available"}
              </p>
              <p>
                <strong>Location:</strong> {event.location || "No location"}
              </p>
              <p>
                <strong>Description:</strong> {event.description || "No description"}
              </p>
            </div>
          ))
        ) : (
          // Message when no events are available
          <div style={{ width: "100%", textAlign: "center" }}>
            {noPostsMessage}
          </div>
        )}
      </div>
    </>
  );
}

export default PublishedEvents;
