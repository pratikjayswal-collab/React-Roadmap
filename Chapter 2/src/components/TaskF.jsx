import React from 'react'
import { useState } from 'react'

const TaskF = () => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setUser((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleSubmit = (e) => {
    e.preventDefault()
    setUser({ username: "",
        email: "",
        password: ""})
        console.log(user)
    }

    return (
        <div>
            <form className='form' action="" onSubmit={handleSubmit}>
                <div>Sign Up</div>

                <div>
                    <label htmlFor="username"><b>User Name : </b></label>
                    <input onChange={handleChange} type="text" name='username' value={user.username} placeholder='Enter username' />
                </div>

                <div>
                    <label htmlFor="email"><b>Email : </b></label>
                    <input onChange={handleChange} type="email" name='email' value={user.email} placeholder='Enter email' />
                </div>

                <div>
                    <label htmlFor="password"><b>Password : </b></label>
                    <input onChange={handleChange} type="password" name='password' value={user.password} placeholder='Enter password' />
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default TaskF
