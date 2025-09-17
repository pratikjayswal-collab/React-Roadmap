import React, {useEffect, useState} from 'react'

const TaskB = () => {

    const [posts, setposts] = useState([])
    const [btn, setbtn] = useState(false)

    useEffect(() => {
        console.log("hii")
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response)=>response.json())
      .then((json)=> setposts(json))

    }, [btn])
    

  return (
      <div>
        
        <div><button onClick={(e)=>setbtn((prev)=> !prev)}>click me </button></div>
        {posts.map((item) => (
            <div className='border flex flex-col' key={item.id}>
                <div >{item.userId}</div>
                <div>{item.title}</div>
                <div>{item.body}</div>
            </div>
        ))}
    </div>
  )
}

export default TaskB
