import React from 'react'
import { Link } from 'react-router-dom'

function PublicPage() {
  return (
    <div>
      PublicPage !!
      <Link to={'/login'}> Login </Link>
    </div>
  )
}

export default PublicPage
