import React, { useContext } from 'react'
import AuthContext from '../../../store/authContext'
import { Outlet } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'

function BaseLayout() {
  const auth = useContext(AuthContext)
  return (
    <div className={'d-flex'}>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default BaseLayout
