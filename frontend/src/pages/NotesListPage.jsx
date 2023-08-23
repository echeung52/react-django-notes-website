import ListItem from "../components/Listitem"
import {useEffect, useState} from 'react'
import axios from 'axios'
import AddButton from "../components/AddButton";

export default function NotesListPage(){

    const[notes, setNotes] = useState([])

    useEffect(()=>{
        fetchNotes()
    }, [])

    async function fetchNotes(){
        try{
            const response = await axios.get("http://localhost:8000/api/notes")
            setNotes(response.data)
        }
        catch(error){
            console.error("Error feching data:", error)
        }
        
    }
    

    return(
        <div className="notes">
            <div className="notes-header">
                <h2 className="notes-title">&#9782; Notes</h2>
                <p className="notes-count">{notes.length}</p>
            </div>
            <div className="notes-list">
                {notes.map((note, index) =>(
                    <ListItem key={index} note={note}/>
                ))}
            </div>
            <AddButton />
        </div>
    )
}