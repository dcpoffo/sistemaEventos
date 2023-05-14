import React from 'react'

import { TableData } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useAPI } from '../../../service/API';
import { useTranslation } from 'react-i18next';

import styles from './ListaParticipantes.module.scss'

function ListaParticipantes() {
  const navigate = useNavigate();
  const { t } = useTranslation()
  const api = useAPI();
  
  async function handleApagar(data: any): Promise<boolean> {
    try {
      await api._delete('participantes/' + data.id)
      return true;
    } catch (e) {
      return false;
    }
  }

  async function handleEdit(data: any): Promise<boolean> {
    navigate('edit/' + data.id)
    return false;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
      <h1>{t('pages.participantes.title')}</h1>
      <button 
        onClick={() => navigate('add')} 
        className={'btn btn-primary btn-sm'}>{t('actions.add')}</button>
      </div>

      <TableData
        url={'participantes'}        
        fields={[
          { label: 'pages.participantes.id', acessor: 'id', type: 'number'},
          { label: 'pages.participantes.name', acessor: 'name', type: 'text'},
          { label: 'pages.participantes.email', acessor: 'email', type: 'text'},
          { label: 'pages.participantes.tipo', acessor: 'tipo', type: 'text'}
        ]}
        filters={{}}
        actions={[
          {
            label: 'Editar',
            icon: <FaEdit />,
            action: handleEdit
          },
          {
            label: 'Deletar',
            icon: <FaTrash />,
            action: handleApagar
          }
        ]}
      />
    </div>
  )
}

export default ListaParticipantes
