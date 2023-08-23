import { useParams, Link, useNavigate } from "react-router-dom";
import ArrowLeft from "../assets/arrow-left.svg";
import { useState, useEffect } from "react";
import axios from "axios";


export default function NotePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState({});
  useEffect(() => {
    fetchNote();
  }, [id]);

  async function fetchNote() {
    if(id==="new") return
    try {
      const response = await axios.get(`http://localhost:8000/api/notes/${id}`);
      setNote(response.data);
    } catch (error) {
      console.error("Error feching data:", error);
    }
  }

  async function updateNote() {
    try {
      await axios.put(`http://localhost:8000/api/notes/${id}`, {
        ...note,
        'updated': new Date()
      });
    } catch (error) {
      console.error("Error making PUT Request:", error);
    }
  }

  async function createNote() {
    try {
      await axios.post(`http://localhost:8000/api/notes/`, {
        ...note,
        'updated': new Date()
      });
    } catch (error) {
      console.error("Error making POST Request:", error);
    }
  }


  function handleSubmit() {
    if (id !== "new" && !note.body) {
      deleteNote();
    } else if (id !== "new") {
      updateNote();
    } else if (id === "new" && note !== null) {
      createNote();
    }
    navigate("/");
  }

  async function deleteNote() {
    try {
      await axios.delete(`http://localhost:8000/api/notes/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error making DELETE Request:", error);
    }
  }

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <img src={ArrowLeft} alt="Back" onClick={handleSubmit} />
          </Link>
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note?.body}
      />
    </div>
  );
}
