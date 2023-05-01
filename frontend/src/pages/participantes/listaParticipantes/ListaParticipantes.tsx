import React from 'react'

import { TableData } from '../../../components';

function ListaParticipantes() {
  
  return (
  <div> 
    <h1>Lista de Participantes</h1>
    <TableData
      url={'participantes'}
      query={{}}
      fields={[
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
