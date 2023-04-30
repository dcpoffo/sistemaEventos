import React, { useContext } from 'react'
import { Outlet, Routes, Route, Navigate } from 'react-router-dom'
import NotFound from '../pages/notFound/NotFound'
import { Dashboard, Home, Login, Participantes, PublicPage } from '../pages'
import AuthContext from '../store/authContext'
import { BaseLayout } from '../components'
import Profile from '../pages/profile/Profile'
import Eventos from '../pages/eventos/Eventos'

const RequireAuth = ({ children }: { children: any }) => {
  const auth = useContext(AuthContext)

  if (!auth.user) {
    return <Navigate to={'/login'} />
  }

  return children
}

const MainRouter = () => {
  return (
    <Routes>
      <Route element={<Outlet />} errorElement={<NotFound />}>
        <Route path='/' element={<PublicPage />} />
        <Route path='/login' element={<Login />} />

        <Route
          path='/principal'
          element={
            <RequireAuth>
              <BaseLayout />
            </RequireAuth>
          }
        >
          <Route path='/principal/home' element={<Home />} />
          <Route path='/principal/dashboard' element={<Dashboard />} />
          <Route path='/principal/profile' element={<Profile />} />
          <Route path='/principal/participantes' element={<Participantes />} />
          <Route path='/principal/eventos' element={<Eventos />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default MainRouter
