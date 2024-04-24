import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

function NoteForm({ onSave }) {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/notes/${id}`,
        { title, content },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Note updated successfully");
        navigate("/");
        onSave({ title, content });
      }
    } catch (error) {
      console.error("Error updating note:", error.message);
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/notes");
        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }
        const data = await response.json();
        const response2 = data.filter((row) => row._id === id);
        setTitle(response2[0]?.title || "");
        setContent(response2[0]?.content || "");
        setData(response2);
      } catch (error) {
        console.error("Error fetching notes:", error.message);
      }
    };

    fetchNotes();
  }, [id]);

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="form-title">Edit Note</h2>
      <div className="form-container">
        <div>
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="form-label">
            Content:
          </label>
          <textarea
            id="content"
            className="form-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Save
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
