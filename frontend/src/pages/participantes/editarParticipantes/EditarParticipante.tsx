import React, { useContext, useEffect, useState } from 'react'

import { TableData } from '../../../components';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { useAPI } from '../../../service/API';
import AuthContext from '../../../store/authContext';

import educameet from "../../../assets/img/educameet.png";

type ParticipanteData = {
  file?: any,
  name: string,
  tipo: string,
}

function EditarParticipante() {

  const { id } = useParams();

  const auth = useContext(AuthContext);

  const [state, setState] = useState<ParticipanteData>(
    {
      name: '',
      tipo: '',
    })

  const api = useAPI();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<any>(educameet);

  useEffect(() => {
    api.get('participantes/' + id, {}).then((res) => {
      setState({name: res.data.name, tipo: res.data.tipo})
      setProfileImage(process.env.REACT_APP_BACK_HOST + 'files/' + res.data.profileImage.id)
    })
  }, [id])

  const updateState = (e: any, field: string) => {
    setState((state) => ({ ...state, [field]: e.target.value }))
  }

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    }

    if (file) {
      setState((state) => ({ ...state, file }))
      reader.readAsDataURL(file);
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const htmlConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Acess-Control-Allow-Origin': '*',
        Authorization: auth.user?.basicAuth,
      },
    }

    const formData = new FormData();
    formData.append("file", state.file);
    formData.append("name", state.name);
    formData.append("tipo", state.tipo);


    api.put('participantes', formData, htmlConfig).then(() => {
      navigate('/principal/participantes')
    })
  }

  return (
    <div>
      <h1>Edição de Participante</h1>

      <Card.Body>
        <Form onSubmit={handleSubmit}>

          <Form.Group className='mb-3'>
            <img src={profileImage} width={50} height={50} className='rounded-circle' alt={'profileImage'} />
            <Form.Label> Imagem de Perfil </Form.Label>
            <input
              type='file'
              className={'form-control'}
              accept={'image/*'}
              onChange={(e) => handleImageChange(e)}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label> Nome </Form.Label>
            <Form.Control
              type='text' placeholder='Digite com o nome do Participante'
              value={state.name} onChange={(e) => updateState(e, 'name')}
            />
          </Form.Group>          
          
          <Form.Group className='mb-3'>
            <Form.Label> Tipo (ACADÊMICO OU ORGANIZADOR)</Form.Label>
            <Form.Select aria-label="tipo" value={state.tipo} onChange={(e) => updateState(e, 'tipo')}>
              <option>Escolha o tipo </option>
              <option value="ACADEMICO">ACADEMICO</option>
              <option value="ORGANIZADOR">ORGANIZADOR</option>              
            </Form.Select>             
          </Form.Group>         

          <Button variant='primary' type='submit'>
            Alterar
          </Button>
        </Form>
      </Card.Body>
    </div>
  )
}

export default EditarParticipante
