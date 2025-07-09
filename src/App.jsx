import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import AddRoom from './components/room/AddRoom'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import ExistingRoom from './components/room/ExistingRoom.jsx'

function App() {
  return (
    <>
      <AddRoom />
      <ExistingRoom/>
      

    </>
  )
}

export default App
