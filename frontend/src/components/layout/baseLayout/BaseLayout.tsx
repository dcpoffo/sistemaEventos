import React, { useContext } from 'react'
import AuthContext from '../../../store/authContext'
import { Outlet } from 'react-router-dom'
import Sidebar, { SidebarProps } from '../sidebar/Sidebar'
import { FaChartPie, FaHome,  } from 'react-icons/fa'
import { BsPersonVcardFill, BsCalendar3 } from 'react-icons/bs'


function BaseLayout() {

  const auth = useContext(AuthContext)

  const menuLinks: { [role: string]: SidebarProps } = {
    // TODO verificar quem pode acessar o que        
    ROLE_ADMIN: {
      links: [
        {
          text: 'layout.sidebar.home',
          path: '/principal/home',
          icon: <FaHome/>
        },
        {
          text: 'layout.sidebar.dashboard',
          path: '/principal/dashboard',
          icon: <FaChartPie/>
        },
        {
          text: 'layout.sidebar.participant',
          path: '/principal/participantes',
          icon: <BsPersonVcardFill/>
        },
        {
          text: 'layout.sidebar.event',
          path: '/principal/eventos',
          icon: <BsCalendar3/>
        }
      ],
      userLinks: [
        {
          text: 'layout.sidebar.profile',
          path: '/principal/profile'
        }
      ]
    },
    ROLE_ORGANIZADOR: {
      links: [
        {
          text: 'layout.sidebar.home',
          path: '/principal/home',
          icon: <FaHome/>
        },
        {
          text: 'layout.sidebar.dashboard',
          path: '/principal/dashboard',
          icon: <FaChartPie/>
        },
        {
          text: 'layout.sidebar.participant',
          path: '/principal/participantes',
          icon: <BsPersonVcardFill/>
        },
        {
          text: 'layout.sidebar.event',
          path: '/principal/eventos',
          icon: <BsCalendar3/>
        }
      ],
      userLinks: [
        {
          text: 'layout.sidebar.profile',
          path: '/principal/profile'
        }
      ]
    },
    ROLE_ACADEMICO: {
      links: [
        {
          text: 'layout.sidebar.home',
          path: '/principal/home',
          icon: <FaHome/>
        },
        {
          text: 'layout.sidebar.participant',
          path: '/principal/participantes',
          icon: <BsPersonVcardFill/>
        },
        {
          text: 'layout.sidebar.event',
          path: '/principal/eventos',
          icon: <BsCalendar3/>
        }
      ],
      userLinks: [
        {
          text: 'layout.sidebar.profile',
          path: '/principal/profile'
        }
      ]
    },
      UNDEFINED: {
      links: [],
      userLinks: []
    }
  }

  return (
    <div className={'d-flex'}>
      <Sidebar {...menuLinks[auth.user?.roles[0].authority || 'UNDEFINED']}/>
      <Outlet />
    </div>
  )
}

export default BaseLayout
