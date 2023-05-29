import './App.css'
import { Outlet } from 'react-router-dom'
import { NavToSettings } from './lib/navButtons'
import { IoMenu } from 'react-icons/io5'
import { MenuModal } from './Modal'
import { useState } from 'react'

function App() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="head-container">
        <IoMenu className="main-menu" onClick={() => setShowMenu(true) } />
        <NavToSettings />
      </div>
      <div className="body-container">
        <Outlet />
      </div>
      <MenuModal isOpen={showMenu} onClose={() => setShowMenu(false)} />
    </>
  )
}

export default App
