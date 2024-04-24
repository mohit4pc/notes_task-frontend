import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";
import EditNoteForm from "./components/EditNoteForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer />

        <header className="header">
          <h1>Notes App</h1>
        </header>
        <div className="container">
          <Routes>
            <Route path="/" element={<NoteList />} />
            <Route path="/create" element={<NoteForm />} />
            <Route path="/edit/:id" element={<EditNoteForm />} />
            {/* Add more routes for editing, deleting notes, etc. */}
          </Routes>
        </div>
        <footer className="footer">
          <p>© 2024 Notes App</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
