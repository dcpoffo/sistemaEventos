import React, { useContext } from 'react'
import AuthContext from '../../../store/authContext'

import styles from './Sidebar.module.scss'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import educameet from '../../../assets/img/educameet.png'
import { useAPI } from '../../../service/API'

type Link = {
  text: string
  path: string
  icon: JSX.Element
}

type UserLink = {
  text: string
  path: string
}

export type SidebarProps = {
  links: Link[]
  userLinks: UserLink[]
}

function Sidebar({ links, userLinks }: SidebarProps) {
  const { t } = useTranslation()
  const auth = useContext(AuthContext)

  function logout() {
    if (auth.updateUser) auth.updateUser()
  }

  return (
    <div className={'d-flex flex-column flex-shrink-0 p-3 text-bg-dark ' + styles.sidebar}>
      <img className={styles.img} src={educameet} alt={'educameet'} />
      {/* <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">{t('layout.brand')}</span>
            </a> */}
      <hr />
      <ul className='nav nav-pills flex-column mb-auto'>
        {links.map((link) => {
          return (
            <li key={link.path} className='nav-item'>
              <Link to={link.path} className='nav-link text-white' aria-current='page'>
                {link.icon} {t(link.text)}
              </Link>
            </li>
          )
        })}
      </ul>
      <hr />
      <div className='dropdown'>
        <a
          href='#'
          className='d-flex align-items-center text-white text-decoration-none dropdown-toggle'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          <img
            /* /files vem do endpoint  */
            src={process.env.REACT_APP_BACK_HOST + 'files/' + auth.user?.profileImage.id}
            alt=''
            width='32'
            height='32'
            className='rounded-circle me-2'
          />          
          <strong>{auth.user?.name}</strong>
        </a>
        <ul className='dropdown-menu dropdown-menu-dark text-small shadow'>
          {userLinks.map((link) => {
            return (
              <li key={link.path}>
                <Link className='dropdown-item' to={link.path}>
                  {t(link.text)}
                </Link>
              </li>
            )
          })}
          <li>
            {' '}
            <hr className='dropdown-divider'></hr>{' '}
          </li>
          <li>
            <div style={{ cursor: 'pointer' }} onClick={logout} className='dropdown-item'>
              {t('layout.close')}
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
