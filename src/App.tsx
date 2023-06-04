import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { NavToSettings } from './lib/navButtons'
import { TallyBrand } from './system/icons';
import { GrAdd } from 'react-icons/gr'
import { MenuModal } from './Modal'
import { useEffect, useState } from 'react'
import { CatalogControl, initCatalog } from './data/catalog';

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [catalog, setCatalog] = useState<CatalogControl | null>(null);
  const n = useNavigate();

  useEffect(() => {
    initCatalog().then((initialized) => {
      console.log('initialized', initialized)
      setCatalog(initialized);
    })
  }, []);

  if (!catalog) {
    console.log('waiting on catalog')
    return <div>loading</div>
  }

  return (
    <>
      <div className="head-container">
        <TallyBrand inverse full onClick={() => n('/')} />

        <NavToSettings />
      </div>
      <div className="body-container">

        <Outlet context={ catalog } />
      </div>
      <div className="action-footer">
        <GrAdd className="main-menu" onClick={() => setShowMenu(true) } />
      </div>
      <MenuModal isOpen={showMenu} onClose={() => setShowMenu(false)} />
    </>
  )
}

export default App
