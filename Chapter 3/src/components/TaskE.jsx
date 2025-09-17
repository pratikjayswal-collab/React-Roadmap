import React, {useEffect, useRef} from 'react'

const TaskE = () => {

    const inputRef = useRef()
    useEffect(() => {
      inputRef.current.focus()
    }, [])
    
  return (
    <div>
      <div>
        <label htmlFor="input">Enter the text : </label>
        <input id='input' ref={inputRef} type="text"  placeholder='write here' className='border'/>
      </div>
    </div>
  )
}

export default TaskE
