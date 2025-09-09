import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
const RootLayout = () => {
  return (
    <div style={{display: 'flex', backgroundColor: "#090a0b"}} id='RootLayout'>
      <Sidebar />
      <Outlet />
    </div>

  )
}

export default RootLayout