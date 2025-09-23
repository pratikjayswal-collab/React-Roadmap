import { useState, useRef } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import { Outlet, useLocation } from 'react-router'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

function App() {
  const location = useLocation()
  const nodeRef = useRef(null)

  return (
    <>
      <div className="app-container">
        <Navbar />
        <div className="page-container">
          <TransitionGroup component={null}>
            <CSSTransition
              key={location.pathname}
              classNames="page-transition"
              timeout={200}
              nodeRef={nodeRef}
              unmountOnExit
            >
              <div className="page" ref={nodeRef}>
                <Outlet />
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    </>
  )
}

export default App