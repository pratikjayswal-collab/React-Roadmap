import React from 'react'

const Task2 = ({obj}) => {
    return (
        <div className='flex'>
            <div className='profile'><img className='profile_img' src={obj.img || "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"} alt="" /></div>
            <div>
            <div className="username">{obj.name}</div>
            <div className="bio">{obj.bio}</div>
            </div>
        </div>
    )
}

export default Task2

