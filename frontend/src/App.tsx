import React, {useState} from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import MainRouter from './routes/MainRouter'
import AuthContext, { User } from './store/authContext'

function App() {

  const [user, setUser] = useState<User>();

  return (
    <AuthContext.Provider value={{user, updateUser: setUser}}>
      <MainRouter />
    </AuthContext.Provider>
  )
}

export default App
