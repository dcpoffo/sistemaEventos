import React from 'react'

import { TableData } from '../../../components';
import { useNavigate } from 'react-router-dom';

function ListaParticipantes() {
  
  const navigate = useNavigate();

  return (
  <div> 
    <h1>Lista de Participantes</h1>
    <button onClick={() => navigate('add')} className={'btn btn-primary btn-sm'}>Novo</button>    

    <TableData
      url={'participantes'}
      query={{}}
      fields={[
        {
          label: 'Id',
          acessor: 'id',
          type: 'number'
        },
        {
          label: 'Nome',
          acessor: 'name',
          type: 'text'
        },
        {
          label: 'E-mail',
          acessor: 'email',
          type: 'text'
        },
        {
          label: 'Tipo',
          acessor: 'tipo',
          type: 'text'
        }
      ]}
      actions={[]} />
  </div>
  )
}

export default ListaParticipantes
