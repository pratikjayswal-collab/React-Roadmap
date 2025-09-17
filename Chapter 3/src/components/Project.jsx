import React, { useState, useEffect } from 'react'

const Project = () => {
    const [note, setNote] = useState("")
    const [notes, setNotes] = useState(() => {
        const item = window.localStorage.getItem("notes")
        return item ? JSON.parse(item) : []
    })

    useEffect(() => {
        window.localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])

    const handleChange = (e) => {
        setNote(e.target.value)
    }

    const handleAdd = () => {
        setNotes([...notes, { note }])
        setNote("")
    }

    const handleEdit = (index) => {
        let noteToEdit = notes[index]
        setNote(noteToEdit.note)
      let newNotes = notes.filter((item, i)=>{
            return i != index
            })
        setNotes(newNotes)
    }
    
    const handleDelete = (index) => {
      let delConfirm = confirm("Are you sure, that you want to delete this Note?")
      if(delConfirm){
        let newNotes = notes.filter((item, i)=>{
            return i != index
        })
        setNotes(newNotes)
      }
    }
    


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">

            <header className="w-full max-w-2xl mb-6">
                <h1 className="text-3xl font-bold text-center text-gray-800">
                    📝 My Notes
                </h1>
            </header>

            <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-4 mb-6">
                <textarea
                    placeholder="Write your note here..."
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    value={note}
                    onChange={handleChange}
                />
                <button disabled={!note.trim()} onClick={handleAdd} className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    Add Note
                </button>
            </div>

            <div className="w-full max-w-2xl space-y-3">
                {notes.length == 0 && <div className='m-5'>No Notes to display.</div>}

                {notes.length > 0 &&
                    notes.map((item, index) => (<div key={index}>
                        <p className="text-gray-700">
                            {item.note}
                        </p>
                        <div className="flex space-x-2">
                            <button onClick={()=>handleEdit(index)} className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                                Edit
                            </button>
                            <button onClick={()=>handleDelete(index)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                                Delete
                            </button>
                        </div>
                    </div>))
                }
            </div>
        </div>
    )
}

export default Project
