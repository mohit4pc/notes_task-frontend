import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
function NoteForm({ onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/notes",
        { title, content },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status == 201) {
        toast.success("Note added successfully");
        navigate("/");
      }
      onSave({ title, content });
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding note:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="form-title">Add Note</h2>
      <div className="form-container">
        {" "}
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
