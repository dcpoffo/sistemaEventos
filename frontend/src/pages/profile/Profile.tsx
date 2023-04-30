import React, { useContext } from 'react'
import AuthContext from '../../store/authContext'

function Profile() {
  const auth = useContext(AuthContext)
  return <div>Perfil do {auth.user?.name}</div>
}

export default Profile
