import React, { useContext } from 'react'
import AuthContext from '../../store/authContext'

function Eventos() {
  const auth = useContext(AuthContext)
  return <div>Eventos</div>
}

export default Eventos
