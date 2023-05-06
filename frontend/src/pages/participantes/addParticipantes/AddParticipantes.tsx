import React, { useContext, useState } from 'react'

import { TableData } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Dropdown } from 'react-bootstrap';
import { useAPI } from '../../../service/API';
import AuthContext from '../../../store/authContext';

import educameet from "../../../assets/img/educameet.png";

type ParticipanteData = {
  file?: any,
  name: string,
  email: string,
  tipo: string,
  password: string
}

function AddParticipantes() {

  const auth = useContext(AuthContext);

  const [state, setState] = useState<ParticipanteData>(
    {      
      name: '',
      email: '',
      tipo: '',
      password: ''
    })

  const api = useAPI();

  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState<any>(educameet);

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
      setState((state) => ({...state, file}))
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
    formData.append("email", state.email);
    formData.append("tipo", state.tipo);
    formData.append("password", state.password);


    api.post('participantes', formData, htmlConfig).then(() => {
      navigate('/principal/participantes')
    })
  }

  return (
    <div>
      <h1>Cadastro de Participantes</h1>

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

          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label> E-mail/Login </Form.Label>
            <Form.Control
              type='email' placeholder='Digite o login (e-mail)'
              value={state.email} onChange={(e) => updateState(e, 'email')}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label> Tipo </Form.Label>
            <Form.Control
              type='text'
              placeholder='Tipo de Participante (ACADEMICO OU ORGANIZADOR) '
              value={state.tipo} onChange={(e) => updateState(e, 'tipo')}
            />
          </Form.Group>
          {/* 
          <Form.Group className='mb-3'>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Tipo
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">ACADEMICO</Dropdown.Item>
                <Dropdown.Item href="#/action-2">ORGANIZADOR</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group> */}

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type='password' placeholder='Senha'
              value={state.password} onChange={(e) => updateState(e, 'password')}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Cadastrar
          </Button>
        </Form>
      </Card.Body>
    </div>
  )
}

export default AddParticipantes
