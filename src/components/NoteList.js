import React, { useState, useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";

function NoteList() {
  // State for storing notes and loading/error status
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notes when the component mounts
  useEffect(() => {
    // Function to fetch notes
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/notes");
        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }
        const data = await response.json();
        console.log(data);
        setNotes(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNotes(); // Call the fetchNotes function
  }, []); // Empty dependency array to ensure the effect runs only once
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/notes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete note");
      }
      // Update the notes state after deleting the note
      setNotes(notes.filter((note) => note._id !== id));
      alert("Note deleted successfully");
    } catch (error) {
      alert("Failed to delete note");
      console.error("Error deleting note:", error.message);
    }
  };
  // Render loading spinner while fetching data
  if (loading) {
    return <LoadingSpinner />;
  }

  // Render error message if there was an error fetching data
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <Link to="/create" className="create-button">
        Create
      </Link>
      <div className="note-list">
        {notes.map((note) => (
          <div className="note" key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <div className="button-container">
              <Link className="edit-button" to={`/edit/${note._id}`}>
                Edit
              </Link>
              <button
                className="delete-button"
                onClick={() => handleDelete(note._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default NoteList;
