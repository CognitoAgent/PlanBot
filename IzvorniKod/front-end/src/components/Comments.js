import { useState } from "react";

function Comments() {
  const [comment, setComment] = useState("");
  const event = JSON.parse(sessionStorage.getItem("event"));

  function submitComment() {
    const token = sessionStorage.getItem("token");
    fetch(
      "https://ec2-52-30-64-126.eu-west-1.compute.amazonaws.com:8443/addcomment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId: event.id, comment }),
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Comment added!");
          window.location.replace("eventpage"); // Redirect back to Event page
        } else {
          throw new Error("Failed to add comment");
        }
      })
      .catch((error) => alert(error.message));
  }

  return (
    <div>
      <h2>Add a Comment for {event.title}</h2>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows="5"
        cols="50"
        placeholder="Type your comment here..."
      ></textarea>
      <br />
      <button onClick={submitComment}>Submit Comment</button>
    </div>
  );
}

export default Comments;
