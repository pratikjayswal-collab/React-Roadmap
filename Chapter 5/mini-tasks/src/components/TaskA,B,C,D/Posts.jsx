import React from 'react'

const Posts = () => {
  return (
    <div className="p-4">
    <h3 className="text-lg font-semibold mb-4">John's Posts</h3>
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="font-medium">Just finished building a React app!</p>
        <span className="text-sm text-gray-500">2 hours ago</span>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="font-medium">Learning about nested routes in React Router</p>
        <span className="text-sm text-gray-500">1 day ago</span>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="font-medium">Beautiful sunset today! 🌅</p>
        <span className="text-sm text-gray-500">3 days ago</span>
      </div>
    </div>
  </div>
  )
}



export default Posts