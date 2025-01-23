import Button from "./Button";
import Footer from "./Footer";
import { useState, useEffect } from "react";
function Event({ event }) {
  const [accepted, setAccepted] = useState(event.accepted || false);
  const [showMap, setShowMap] = useState(false);
  const [embedUrl, setEmbedUrl] = useState(""); // State for the map embed URL
  const [comments, setComments] = useState([]);

  function showMore() {
    //dohvaćanje komentara i prijedloga za događaj
    const token = sessionStorage.getItem("token");
    fetch(
      "https://ec2-52-30-64-126.eu-west-1.compute.amazonaws.com:8443/showPropositionsComments",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
          Authorization: `Bearer ${token}`,
        },
        body: event.id,
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Not possible to see more");
        }
      })
      .then((r) => {
        //spremanje podataka u sessionStorage i preusmjeravanje na stranicu za prikaz tih podataka
        sessionStorage.setItem("propositions", JSON.stringify(r[0]));
        sessionStorage.setItem("comments",JSON.stringify(r[1]));
        alert(r[1].length);
        sessionStorage.setItem("event",JSON.stringify(event));
        window.location.replace("propositions");
      })
      .catch((error) => alert(error.message));
  }
  function changeAcceptStatus() {
    if (accepted) {
      event.accepted = false;
    } else {
      event.accepted = true;
    }
    //slanje informacije o prihvaćanju događaja na server
    const token = sessionStorage.getItem("token");
    fetch(
      "https://ec2-52-30-64-126.eu-west-1.compute.amazonaws.com:8443/acceptstatus",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: event.id, accepted: event.accepted }),
      }
    )
      .then((response) => {
        if (response.ok) {
          if (event.accepted) {
            alert("Event accepted!");
          } else {
            alert("Event canceled!");
          }
          setAccepted(event.accepted);
        } else {
          event.accepted = !event.accepted;
          throw new Error("Change not possible");
        }
      })
      .then(() => window.location.reload())
      .catch((error) => alert(error.message));
  }

  async function toggleMap() {
    if (showMap) {
      setShowMap(false);
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      // Fetch the API key from the backend
      const response = await fetch("https://ec2-52-30-64-126.eu-west-1.compute.amazonaws.com:8443/api/maps-key", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }); // Replace with your backend endpoint
      if (!response.ok) throw new Error("Failed to fetch API key");

      console.log(response);
      const data = await response.text();
      console.log(data);

      // Generate the embed URL dynamically
      const query = encodeURIComponent(event.location);
      const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${data}&q=${query}`;

      // Update the state to show the map
      setEmbedUrl(mapUrl);
      setShowMap(true);
    } catch (error) {
      alert("Error loading map: " + error.message);
    }
  }

  function navigateToComments() {
    sessionStorage.setItem('event', JSON.stringify(event));
    window.location.replace('comments');
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "300px",
        marginTop: "20px",
        minHeight: "200px",
        border: "1px solid black",
        borderRadius: "4px",
        backgroundColor: "white",
        padding: "30px",
      }}
    >
      <h3 style={{ margin: "0px" }}>{event.title}</h3>
      <div>
        <p style={{width:"300px"}}>{event.date}</p>
        <p style={{width:"300px"}}>{event.location}</p>
        <p style={{width:"300px"}}>{event.description}</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <Button
          text={accepted ? "Cancel" : "Accept"}
          onClick={changeAcceptStatus}
          style={{marginRight:"20px"}}
        />
        <Button text="Show More" onClick={showMore} style={{marginRight:"20px"}}/>
        <Button text={showMap ? "Hide Map" : "Show Map"} onClick={toggleMap} />
      </div>
      {showMap && (
        <div style={{ marginTop: "20px", width: "100%", height: "200px" }}>
          <iframe
            title="Google Maps"
            width="100%"
            height="100%"
            style={{ border: "0" }} 
            src={embedUrl}
            allowFullScreen
          ></iframe>
        </div>
      )}

    </div>
  );
}
export default Event;
