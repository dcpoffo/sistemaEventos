import axios from 'axios'
import { useContext } from 'react'
import AuthContext from '../store/authContext'

export const useAPI = () => {
  const auth = useContext(AuthContext);
  const URL_BASE: string | undefined = process.env.REACT_APP_BACK_HOST

  const defaultConfigHtml = () => {
    const htmlConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Acess-Control-Allow-Origin': '*',
        Authorization: auth.user?.basicAuth,
      },
    }
    return htmlConfig;
  }

  const get = (url: string, params: any, config?: any) => {
    return axios.get(URL_BASE + url, !config ? defaultConfigHtml() : config)
  }

  const post = (url: string, data: any, config?: any) => {
    return axios.post(URL_BASE + url, data, !config ? defaultConfigHtml() : config)
  }

  const put = (url: string, data: any, config?: any) => {
      return axios.put(URL_BASE + url, data, !config ? defaultConfigHtml() : config)    
  }

  const _delete = (url: string, config?: any) => { 
      return axios.delete(URL_BASE + url, !config ? defaultConfigHtml() : config )
  }

  return { get, post, put, _delete}

}