import React from 'react'

import { TableData } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useAPI } from '../../../service/API';

function ListaParticipantes() {
  const api = useAPI();
  const navigate = useNavigate();

  async function handleEdit(item: any): Promise<boolean> {
    navigate('edit/' + item.id)
    return false;
  }

  async function handleApagar(item: any): Promise<boolean> {
    try {
      api._delete('participantes/' + item.id)
      return true;
    } catch (e) {
      return false;
    }
  }

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
