import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router"

const Users = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("query") || ""

  const [input, setInput] = useState(query)

  const userList = [
    "Alice Johnson",
    "Bob Smith",
    "Charlie Brown",
    "David Williams",
    "Eva Smith",
  ]

  useEffect(() => {
    if (input) {
      setSearchParams({ query: input })
    } else {
      setSearchParams({})
    }
  }, [input, setSearchParams])

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const filteredUsers = userList.filter((user) =>
    user.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Search users..."
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <ul className="mt-6 space-y-2">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <li key={index} className="p-2 border border-gray-200 rounded">
              {user}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </ul>
    </div>
  )
}

export default Users