import React from 'react'

const Friends = () => {
  return (
    <div className="p-4">
    <h3 className="text-lg font-semibold mb-4">John's Friends</h3>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <img 
          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face" 
          alt="Jane" 
          className="w-12 h-12 rounded-full mx-auto mb-2"
        />
        <p className="font-medium">Jane Smith</p>
        <p className="text-sm text-gray-500">@jane</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <img 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face" 
          alt="Mike" 
          className="w-12 h-12 rounded-full mx-auto mb-2"
        />
        <p className="font-medium">Mike Johnson</p>
        <p className="text-sm text-gray-500">@mike</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <img 
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face" 
          alt="Sarah" 
          className="w-12 h-12 rounded-full mx-auto mb-2"
        />
        <p className="font-medium">Sarah Wilson</p>
        <p className="text-sm text-gray-500">@sarah</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <img 
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face" 
          alt="Alex" 
          className="w-12 h-12 rounded-full mx-auto mb-2"
        />
        <p className="font-medium">Alex Brown</p>
        <p className="text-sm text-gray-500">@alex</p>
      </div>
    </div>
  </div>
  )
}

export default Friends