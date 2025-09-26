import { useState, useEffect, useRef} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { noteService } from '../servics/noteService'

const Home = () => {
  const {user} = useAuth()
  const [notes, setNotes] = useState([])
  const [note, setNote] = useState("")
  const [editingNoteId, setEditingNoteId] = useState(null)
  const [editText, setEditText] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const ref = useRef(null)

  useEffect(() => {
    if(user){
      fetchNotes()
    }
  }, [user])
  
  useEffect(() => {
    if (editingNoteId !== null && ref.current) {
      ref.current.focus()
    }
  }, [editingNoteId])
  
  const fetchNotes = async () => {
    try {
      setLoading(true)
      setError("")
      const userNotes = await noteService.getNotes(user.uid)
      setNotes(userNotes)
    } catch (error) {
      console.error("Error fetching notes:", error);
      setError("Failed to fetch notes. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!note.trim()) {
        return
    }

    try {
      setError("")
      const newNote = await noteService.addNote(user.uid, note.trim())
      setNotes([newNote, ...notes])
      setNote("")
      
    } catch (error) {
      console.error("Error adding note:", error);
      setError("Failed to add note. Please try again.");
    }
  }

  const handleEdit = (note) => {
    setEditingNoteId(note.id)
    setEditText(note.text)
  }
  
  const handleSave = async (noteId) => {
    if (!editText.trim()) return

    try {
      setError("")
      const updatedNote = await noteService.updateNote(noteId, editText.trim())
      setNotes(notes.map(n => (n.id === noteId ? { ...n, text: editText.trim() } : n)))
      setEditingNoteId(null)
    } catch (error) {
      console.error("Error updating note:", error)
      setError("Failed to update note. Please try again.")
    }
  }

  const handleChange = (e) => {
    setEditText(e.target.value);
  }

  const handleDelete = async (noteId) => {
    const confirmDelete = window.confirm("Do you want to delete this note?");
    if (!confirmDelete) return;

    try {
      setError("")
      await noteService.deleteNote(noteId)
      setNotes(notes.filter(note => note.id !== noteId))
    } catch (error) {
      console.error("Error deleting note:", error)
      setError("Failed to delete note. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading your notes...</div>
      </div>
    )
  }

  return (
    <div className='flex flex-col w-[80vw] gap-5 m-auto p-6'>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="w-full flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-4xl bg-white p-6 rounded-xl shadow-md">
          <div className="flex flex-col gap-2">
            <label htmlFor="note" className="text-gray-700 font-medium">
              Enter the Note:
            </label>
            <input
              id="note"
              name="note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write your note here..."
              className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
            disabled={!note.trim()}
          >
            Add Note
          </button>
        </form>
      </div>

      <div className='m-auto min-w-2xl'>
        {notes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No notes to display.</div>
            <div className="text-gray-400 text-sm mt-2">Create your first note above!</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 max-w-xl sm:grid-cols-2 lg:grid-cols-1 gap-6 mt-6">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`relative shadow-md rounded-xl p-4 border hover:shadow-lg transition duration-300 ${
                  editingNoteId === note.id ? "bg-yellow-50 border-yellow-300" : "bg-white"
                }`}
              >
                {editingNoteId === note.id ? (
                  <input
                    type="text"
                    className="outline-none w-full bg-transparent rounded-lg border-gray-300 border px-2 py-1"
                    value={editText}
                    onChange={handleChange}
                    ref={ref}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSave(note.id);
                      }
                    }}
                  />
                ) : (
                  <p className="text-gray-800 pr-20">{note.text}</p>
                )}

                <div className="absolute top-2 right-2 flex gap-2">
                  {editingNoteId === note.id ? (
                    <>
                      <button
                        onClick={() => handleSave(note.id)}
                        className="text-green-500 hover:text-green-700 p-1"
                        title="Save"
                      >
                        ✅
                      </button>
                      <button
                        onClick={() => setEditingNoteId(null)}
                        className="text-gray-500 hover:text-gray-700 p-1"
                        title="Cancel"
                      >
                        ❌
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEdit(note)}
                      className="text-blue-500 hover:text-blue-700 p-1"
                      title="Edit"
                    >
                      ✏️
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(note.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3" />
                    </svg>
                  </button>
                </div>

                {note.createdAt && (
                  <div className="text-xs text-gray-400 mt-2">
                    {new Date(note.createdAt.seconds ? note.createdAt.seconds * 1000 : note.createdAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home