import { useState } from 'react';
import './App.css';

function App() {
  const [noteTitle, setNoteTitle] = useState('');
  const [notes, setNotes] = useState([
    { id: '1', title: 'note1' },
    { id: '2', title: 'note2' },
    { id: '3', title: 'note3' },
  ]);
  const [editMode, setEditMode] = useState(false);
  const [editableNote, setEditableNote] = useState(null);

  // input note handler
  const noteHandler = (event) => {
    setNoteTitle(event.target.value);
  };

  // input submit Handler
  const addNotes = (event) => {
    event.preventDefault();

    if (noteTitle.trim() === '') return alert('Enter a valid Title...');

    editMode === false ? creatHandler() : updateHandler()
  };

  const creatHandler = () => {
    const newNotes = {
      id: Date.now() + '',
      title: noteTitle,
    };

    setNotes([...notes, newNotes]);
    setNoteTitle('');
  };

  // Edit button handler
  const editHandler = (note) => {
    setEditMode(true);
    setNoteTitle(note.title);
    setEditableNote(note);
  };

  const updateHandler = () => {
    const editNoteList = notes.map((note) => {
      if (note.id == editableNote.id) {
        return {
          ...note,
          title: noteTitle,
        };
      }
      return note;
    });

    setNotes(editNoteList);
    setNoteTitle("")
    setEditMode(false)
  };

  // Delete button handler
  const removeHandler = (noteId) => {
    const updateNotes = notes.filter((note) => note.id !== noteId);

    setNotes(updateNotes);
  };

  return (
    <>
      <form onSubmit={addNotes}>
        <input
          type="text"
          value={noteTitle}
          onChange={noteHandler}
          placeholder="Enter a Note Title..."
        />
        <button type="submit">{editMode ? 'Update Note' : 'Add Note'}</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <span>{note.title}</span>
            <button onClick={() => editHandler(note)}>Edit</button>
            <button onClick={() => removeHandler(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
