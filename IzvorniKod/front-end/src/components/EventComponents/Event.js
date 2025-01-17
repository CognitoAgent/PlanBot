import Button from "./Button";
import Footer from "./Footer";
import { useState, useEffect } from "react";
function Event({ event }) {
  const [accepted, setAccepted] = useState(event.accepted || false);
  const [showMap, setShowMap] = useState(false);
  const [comments, setComments] = useState([]);

  function proposeChange() {
    sessionStorage.setItem("event", JSON.stringify(event));
    window.location.replace("proposechange");
  }
  function showMore() {
    const token = sessionStorage.getItem("token");
    fetch(
      "https://ec2-52-30-64-126.eu-west-1.compute.amazonaws.com:8443/showpropositions",
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
        sessionStorage.setItem("propositions", JSON.stringify(r));
        window.location.replace("propositions");
      })
      .catch((error) => alert(error.message));
  }
  function changeAcceptStatus() {
    if (accepted) {
      //setAccepted(false);
      event.accepted = false;
    } else {
      //setAccepted(true);
      event.accepted = true;
    }
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

  function toggleMap() {
    setShowMap(!showMap);
  }

  const query = encodeURIComponent(event.location);
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=GMAPS&q=${query}`;

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
        <p>{event.date}</p>
        <p>{event.location}</p>
        <p>{event.description}</p>
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
        <Button text="Show More" onClick={showMore}/>
        {/* 
        <Button text="Propose change" onClick={proposeChange} />
        <Button text="Show propositions" onClick={showPropositions} />
        <Button text={showMap ? "Hide Map" : "Show Map"} onClick={toggleMap} />
        <Button text=" Post comment" onClick={navigateToComments} />
        */}
      </div>
      {showMap && (
        <div style={{ marginTop: "20px", width: "100%", height: "200px" }}>
          <iframe
            title="Google Maps"
            width="100%"
            height="100%"
            style={{ border: "0" }} // Use CSS for the border
            src={embedUrl}
            allowFullScreen
          ></iframe>
        </div>
      )}
      {/* 
      <div>
        <h4>Comments:</h4>
        <div>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <p key={index} style={{ margin: "5px 0" }}>
                {comment}
              </p>
            ))
          ) : (
            <p>No comments yet</p>
          )}
        </div>
      </div>
      */}
    </div>
  );
}
export default Event;
