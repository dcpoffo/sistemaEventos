/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react'
import { Outlet, Routes, Route, Navigate } from 'react-router-dom'
import NotFound from '../pages/notFound/NotFound'
import { Dashboard, Home, Login, PublicPage } from '../pages'

import AuthContext from '../store/authContext'
import { BaseLayout } from '../components'
import Profile from '../pages/profile/Profile'
import Eventos from '../pages/eventos/Eventos'
import ListaParticipantes from '../pages/participantes/listaParticipantes/ListaParticipantes'
import AddParticipantes from '../pages/participantes/addParticipantes/AddParticipantes'
import EditarParticipante from '../pages/participantes/editarParticipantes/EditarParticipante'

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
          errorElement={<NotFound />}
          element={
            <RequireAuth>
              <BaseLayout />
            </RequireAuth>
          }
        >
          <Route path='home' element={<Home />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='profile' element={<Profile />} />
          <Route path='participantes' element={<Outlet />}>
            <Route path='' element={<ListaParticipantes />} />
            <Route path='add' element={<AddParticipantes />} />
            <Route path='edit/:id' element={<EditarParticipante />} />
          </Route>
          <Route path='eventos' element={<Eventos />} />
        </Route>
      </Route>
    </Routes >
  )
}

export default MainRouter
