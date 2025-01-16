import { useState, useEffect } from "react";

function ShowComment() {
  const [comments, setComments] = useState([]);
  const event = JSON.parse(sessionStorage.getItem("event"));

  useEffect(() => {
    // Retrieve comments from sessionStorage
    const storedComments = JSON.parse(sessionStorage.getItem("comments")) || [];
    setComments(storedComments);
  }, []);

  return (
    <div>
      <h2>Comments for {event.title}</h2>
      {comments.length === 0 ? (
        <p>No comments for this event yet.</p>
      ) : (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <p>{comment}</p>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => window.location.replace("eventlist")}>
        EventList
      </button>
    </div>
  );
}

export default ShowComment;
