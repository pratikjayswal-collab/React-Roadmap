import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { noteService } from '../services/noteService'

const Home = () => {
  const { user } = useAuth()
  const [notes, setNotes] = useState([])
  const [note, setNote] = useState("")
  const [editingNoteId, setEditingNoteId] = useState(null)
  const [editText, setEditText] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [mockNotesLoaded, setMockNotesLoaded] = useState(false)
  const ref = useRef(null)

  const [enabled, setEnabled] = useState(false)

  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const searchTimeOutRef = useRef(null)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const notesPerPage = 10

  // Calculate pagination
  const startIndex = (currentPage - 1) * notesPerPage
  const endIndex = startIndex + notesPerPage
  const currentNotes = notes.slice(startIndex, endIndex)
  const totalPages = Math.ceil(notes.length / notesPerPage)

  // Infinite scroll states
  const [displayedNotes, setDisplayedNotes] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const loaderRef = useRef(null)

  useEffect(() => {
    if (user) {
      fetchNotes()
    }
  }, [user])

  useEffect(() => {
    if (editingNoteId !== null && ref.current) {
      ref.current.focus()
    }
  }, [editingNoteId])

  // Initialize infinite scroll when notes are loaded or mode changes
  useEffect(() => {
    if (enabled && notes.length > 0) {
      // Load first batch for infinite scroll
      setDisplayedNotes(notes.slice(0, notesPerPage))
      setHasMore(notes.length > notesPerPage)
    }
  }, [enabled, notes])

  // Infinite scroll observer
  useEffect(() => {
    if (!enabled) return // Only run in infinite scroll mode

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreNotes()
        }
      },
      { threshold: 1.0 }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [enabled, hasMore, displayedNotes])


  const handleSearch = async (query) => {
    if (!query.trim()) {
      fetchNotes()
      return
    }

    try {
      setIsSearching(true)
      setError("")
      const searchResults = await noteService.searchNotes(user.uid, query.trim())
      setNotes(searchResults)
    } catch (error) {
      console.error("Error searching notes:", error)
      setError("Failed to search notes. Please try again.")
    } finally {
      setIsSearching(false)
    }
  }

useEffect(() => {
  return () => {
    if (searchTimeOutRef.current) {
      clearTimeout(searchTimeOutRef.current)
    }
  }
}, [])

  const debouncedSearch = (query) => {
    if (searchTimeOutRef.current) {
      clearTimeout(searchTimeOutRef.current)
    }

    searchTimeOutRef.current = setTimeout(() => {
      handleSearch(query)
    }, 500)
  }


  const loadMoreNotes = async () => {
    if (isLoadingMore) return
    setIsLoadingMore(true)

    await new Promise(resolve => setTimeout(resolve, 500))
    const currentLength = displayedNotes.length
    const nextBatch = notes.slice(currentLength, currentLength + notesPerPage)

    if (nextBatch.length > 0) {
      setDisplayedNotes([...displayedNotes, ...nextBatch])
    }

    if (currentLength + nextBatch.length >= notes.length) {
      setHasMore(false)
    }


    setIsLoadingMore(false)
  }

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

      // Update displayed notes for infinite scroll
      if (enabled) {
        setDisplayedNotes([newNote, ...displayedNotes])
      }

    } catch (error) {
      console.error("Error adding note:", error);
      setError("Failed to add note. Please try again.");
    }
  }

  const handleLoadMockNotes = () => {
    const mockNotes = []
    const currentTime = Date.now()

    for (let i = 1; i <= 200; i++) {
      mockNotes.push({
        id: `mock-${i}-${currentTime}`,
        text: `Mock Note ${i} - This is a sample note for testing purposes`,
        createdAt: {
          seconds: Math.floor((currentTime - (i * 3600000)) / 1000)
        },
        isMock: true
      })
    }

    setNotes([...mockNotes, ...notes])
    setMockNotesLoaded(true)
  }

  const handleEdit = (note) => {
    setEditingNoteId(note.id)
    setEditText(note.text)
  }

  const handleSave = async (noteId) => {
    if (!editText.trim()) return

    try {
      setError("")

      const noteToUpdate = notes.find(n => n.id === noteId)
      if (noteToUpdate?.isMock) {
        setNotes(notes.map(n => (n.id === noteId ? { ...n, text: editText.trim() } : n)))
        if (enabled) {
          setDisplayedNotes(displayedNotes.map(n => (n.id === noteId ? { ...n, text: editText.trim() } : n)))
        }
        setEditingNoteId(null)
        return
      }

      await noteService.updateNote(noteId, editText.trim())
      setNotes(notes.map(n => (n.id === noteId ? { ...n, text: editText.trim() } : n)))
      if (enabled) {
        setDisplayedNotes(displayedNotes.map(n => (n.id === noteId ? { ...n, text: editText.trim() } : n)))
      }
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

      const noteToDelete = notes.find(n => n.id === noteId)
      if (!noteToDelete?.isMock) {
        await noteService.deleteNote(noteId)
      }

      setNotes(notes.filter(note => note.id !== noteId))
      if (enabled) {
        setDisplayedNotes(displayedNotes.filter(note => note.id !== noteId))
      }
    } catch (error) {
      console.error("Error deleting note:", error)
      setError("Failed to delete note. Please try again.")
    }
  }

  const handleToggle = () => {
    setEnabled(!enabled)
    if (!enabled) {
      // Switching to infinite scroll
      setDisplayedNotes(notes.slice(0, notesPerPage))
      setHasMore(notes.length > notesPerPage)
    } else {
      // Switching to pagination
      setCurrentPage(1)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading your notes...</div>
      </div>
    )
  }

  // Choose which notes to display
  const notesToDisplay = enabled ? displayedNotes : currentNotes

  return (
    <div className='flex flex-col items-center w-[90vw] gap-5 m-auto p-6'>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

     <div className="relative w-full max-w-2xl">
  <input
    type="text"
    placeholder='Search Notes...'
    value={searchQuery}
    onChange={(e) => {
      setSearchQuery(e.target.value)
      debouncedSearch(e.target.value)
    }}
    className='border w-full py-2 px-4 pr-20 rounded-2xl focus:outline-none focus:border-blue-400 transition'
  />
  {isSearching && (
    <div className="absolute right-12 top-1/2 -translate-y-1/2">
      <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  )}
  {searchQuery && (
    <button
      onClick={() => {
        setSearchQuery("")
        if (searchTimeOutRef.current) {
          clearTimeout(searchTimeOutRef.current)
        }
        fetchNotes()
      }}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl font-bold"
    >
      ✕
    </button>
  )}
</div>

      <div className="w-full flex items-center justify-center relative">
        <div className="flex flex-col gap-4 w-full max-w-4xl bg-white p-6 rounded-xl shadow-md">
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
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(e);
                }
              }}
              placeholder="Write your note here..."
              className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
            disabled={!note.trim()}
          >
            Add Note
          </button>

          <button
            type="button"
            onClick={handleLoadMockNotes}
            className="bg-purple-600 absolute right-0 top-6 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition disabled:opacity-50"
            disabled={mockNotesLoaded}
          >
            {mockNotesLoaded ? '200 Notes Loaded' : 'Load 200 Notes'}
          </button>

          <div className='absolute right-0 bottom-5 flex gap-2 items-center'>
            <div className={`font-semibold text-sm ${!enabled ? "text-green-600" : "text-gray-500"}`}>
              Pagination
            </div>
            <button
              onClick={handleToggle}
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition ${enabled ? "bg-gray-400" : "bg-gray-400"}`}>
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${enabled ? "translate-x-6" : "translate-x-1"}`} />
            </button>

            <div className={`font-semibold text-sm ${enabled ? "text-green-600" : "text-gray-500"}`}>
              Infinite Scroll
            </div>
          </div>
        </div>
      </div>

      <div className='m-auto min-w-2xl'>
        {notes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No notes to display.</div>
            <div className="text-gray-400 text-sm mt-2">Create your first note above!</div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 max-w-xl sm:grid-cols-2 lg:grid-cols-1 gap-6 mt-6">
              {notesToDisplay.map((note) => (
                <div
                  key={note.id}
                  className={`relative shadow-md rounded-xl p-4 border hover:shadow-lg transition duration-300 ${editingNoteId === note.id ? "bg-yellow-50 border-yellow-300" : "bg-white"
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

            {/* Pagination Controls */}
            {!enabled && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                  Previous
                </button>

                <span className="px-4 py-2 bg-gray-100 rounded">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            )}

            {/* Infinite Scroll Loader */}
            {enabled && (
              <div ref={loaderRef} className="text-center py-6">
                {isLoadingMore ? (
                  <div className="text-blue-600 text-sm font-semibold animate-pulse">Loading more notes...</div>
                ) : hasMore ? (
                  <div className="text-gray-400 text-sm">Scroll for more...</div>
                ) : (
                  <div className="text-gray-500 text-sm">No more notes to load</div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home