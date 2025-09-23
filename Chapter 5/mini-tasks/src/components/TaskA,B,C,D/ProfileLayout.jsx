import React from 'react'
import { Link , Outlet} from 'react-router'

const ProfileLayout = () => {
    const users = [{userid: "john"}, {userid:"pratik"}]   
    //here pratik user data will not be shown. so that will be redirected to not found page.

  return (
     <div className='p-8 max-w-4xl mx-auto'>
      <h2 className='text-center font-bold text-2xl'>User List</h2>
      <ul>
        {users.map((user, index) => (
            <Link key={index} to={user.userid}>
          <li className='border py-1 my-4 rounded-2xl font-semibold text-xl text-gray-600 hover:text-gray-900 text-center bg-gray-300 ' >
            {user.userid}
          </li>
          </Link>
        ))}
      </ul>

      <Outlet />
    </div>
  )
}

export default ProfileLayout