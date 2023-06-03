import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { NavToSettings } from './lib/navButtons'
import { TallyBrand } from './system/icons';
import { GrAdd } from 'react-icons/gr'
import { MenuModal } from './Modal'
import { useState } from 'react'

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const n = useNavigate();

  return (
    <>
      <div className="head-container">
        <TallyBrand inverse full onClick={() => n('/')} />

        <NavToSettings />
      </div>
      <div className="body-container">
        <Outlet />
      </div>
      <div className="action-footer">
        <GrAdd className="main-menu" onClick={() => setShowMenu(true) } />
      </div>
      <MenuModal isOpen={showMenu} onClose={() => setShowMenu(false)} />
    </>
  )
}

export default App
