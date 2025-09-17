import React, {useMemo, useCallback, useState } from 'react'

const TaskF = () => {

 const [numbers] = useState([1, 2, 3, 4, 5, 6])
  const [sum, setSum] = useState(null)


  const calculation = useMemo(() => {
    let total = 0
    numbers.forEach((num) => {
      total += num * num
    })
    return total
  }, [numbers])

  const handleCalculate = useCallback(
    () => {
      setSum(calculation)
    },
    [calculation],
  )
  
  return (
    <div className="p-6 ">
      <h2 className="">Numbers List</h2>
      <ul className="flex gap-1">
        {numbers.map((num, index) => (
          <li key={index}>{num}</li>
        ))}
      </ul>
      <button
        onClick={handleCalculate}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Calculate Sum of Squares
      </button>

      {sum !== null && (
        <p className="mt-4 text-lg font-medium">
          Sum of Squares: <span className="text-blue-600">{sum}</span>
        </p>
      )}
    </div>
  )
}

export default TaskF
