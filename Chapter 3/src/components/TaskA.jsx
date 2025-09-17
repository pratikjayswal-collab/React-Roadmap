import React, {useState} from 'react'

const TaskA = () => {

    const [theme, setTheme] = useState(true)

    const handleTheme = (e) => {
        setTheme(!theme)
    }


    return (
        <div>
            <div className={theme ? "light-theme" : "dark-theme"}>
                <button onClick={handleTheme}>
                    {theme ? (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>)
                        : (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" />
                        </svg>)
                    }

                </button>
            </div>
        </div>
    )
}

export default TaskA
