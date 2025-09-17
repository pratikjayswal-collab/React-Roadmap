import React, {useReducer} from 'react'

const TaskD = () => {
    const initialState = { count: 0 }
    const [state, dispatch] = useReducer(reducer, initialState)

    function reducer(state, action) {
        switch (action.type) {
            case "increment":
                return { count: state.count + 1 }
            case "decrement":
                return { count: state.count - 1 }
            case "reset":
                return {count: 0}
            default:
      return state;
        }
    }
    

    return (
        <div className="text-center p-6">
      <h1 className="text-2xl font-bold mb-4">Count: {state.count}</h1>
      <div className="space-x-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
          onClick={() => dispatch({ type: "increment" })}
        >
          Increment
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
          onClick={() => dispatch({ type: "decrement" })}
        >
          Decrement
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          onClick={() => dispatch({ type: "reset" })}
        >
          Reset
        </button>
      </div>
    </div>
    )
}

export default TaskD
