import React, {useEffect} from 'react';
import { useParams, NavLink, Outlet, useNavigate } from 'react-router';

const Profile = () => {
  const { userid } = useParams()
  
  const navigate = useNavigate()

  const johnData = {
    name: "John Doe",
    username: "john",
    email: "john.doe@example.com",
    phone: "+1 234-567-8901",
    bio: "Software developer passionate about React and JavaScript.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    location: "New York, USA"
  }

  const validUsers = ['john'];
  useEffect(() => {
    if (!validUsers.includes(userid)) {
      navigate('/404', { replace: true })
    }
  }, [userid, navigate])



   if (!validUsers.includes(userid)) {
    return null
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
     
     <button
      className="mb-4 text-blue-500 hover:underline flex items-center"
      onClick={() => navigate(-1)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>

      Go Back
    </button>
        <div className="flex items-center gap-6 mb-6">
          <img
            src={johnData.avatar}
            alt={johnData.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{johnData.name}</h1>
            <p className="text-blue-600">@{johnData.username}</p>
            <p className="text-gray-600 mt-2">{johnData.bio}</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div>
            <span className="font-semibold">Email: </span>
            <span>{johnData.email}</span>
          </div>
          <div>
            <span className="font-semibold">Phone: </span>
            <span>{johnData.phone}</span>
          </div>
          <div>
            <span className="font-semibold">Location: </span>
            <span>{johnData.location}</span>
          </div>
        </div>

        <div className="border-b mb-4">
          <nav className="flex gap-4">
            <NavLink 
              to={`/profile/${userid}`}
             className={({ isActive }) => {
             
              const isPostsActive = location.pathname === `/profile/${userid}`
              return `py-2 px-4 border-b-2 font-medium ${
                isPostsActive 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`
            }}
            >
              Posts
            </NavLink>
            <NavLink 
              to={`/profile/${userid}/friends`}
              className={({ isActive }) =>
                `py-2 px-4 border-b-2 font-medium ${
                  isActive 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`
              }
            >
              Friends
            </NavLink>
          </nav>
          <Outlet />
        </div>

      </div>
  )
}

export default Profile