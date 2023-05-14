import React, { useContext, useRef, useState } from 'react'

import { TableData } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { useAPI } from '../../../service/API';
import AuthContext from '../../../store/authContext';

import educameet from "../../../assets/img/educameet.png";
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
import styles from './AddParticipantes.module.scss'

type ParticipanteData = {
  file?: any,
  name: string,
  email: string,
  tipo: string,
  password: string
}

function AddParticipantes() {
  const navigate = useNavigate();
  const { t } = useTranslation()
  const [state, setState] = useState<ParticipanteData>(
    {
      name: '',
      email: '',
      tipo: '',
      password: ''
    })
  const auth = useContext(AuthContext);
  const api = useAPI();
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [profileImage, setProfileImage] = useState<any>(educameet);

  const onUpdate = (
    e: React.ChangeEvent<any>,
    name: 'name' | 'email' | 'tipo' | 'password',
  ) => {
    setState((state) => ({ ...state, [name]: e.target.value }))
  }

  function handleSubmit(e: any) {
    e.preventDefault()

    if (state.email && state.password) {
      const formData = new FormData();
      formData.append("file", state.file);
      formData.append("name", state.name);
      formData.append("email", state.email);
      formData.append("tipo", state.tipo);
      formData.append("password", state.password);

      const htmlConfig = {
        headers: {
          Authorization: auth.user?.basicAuth,
          'Content-Type': 'multipart/form-data',
          // 'Acess-Control-Allow-Origin': '*',
        },
      }

      api.post('participantes', state, htmlConfig).then(() => {
        navigate('/principal/participantes')
      })
    }
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
    } else {
      setProfileImage(educameet)
    }
  }

  return (
    <div className={'container'}>
      <Card className={'col-lg-4 col-12 m-auto'}>

        <Card.Header>
          <Card.Title>{t('pages.participantes.add')}</Card.Title>
        </Card.Header>

        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <div onClick={() => imageInputRef.current?.click()} className={styles.imageContainer}>
                <img
                  src={profileImage}
                  alt='profile image'
                  width={80} height={75}
                  className='rounded-circle me-2'
                />
                <FaPlus className={styles.plusButton} />
                <input
                  onChange={(e) => handleImageChange(e)}
                  ref={imageInputRef}
                  style={{ display: 'none' }}
                  type={'file'}
                  accept={'image/png, image/jpg'}
                />
              </div>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicName'>
              <Form.Label> {t('pages.participantes.name')} </Form.Label>
              <Form.Control
                type='text' placeholder='Digite com o nome do Participante'
                value={state.name} onChange={(e) => onUpdate(e, 'name')}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label> E-mail/Login </Form.Label>
              <Form.Control
                type='email' placeholder='Digite o login (e-mail)'
                value={state.email} onChange={(e) => onUpdate(e, 'email')}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicTipo'>
              <Form.Label> Tipo (ACADÊMICO OU ORGANIZADOR)</Form.Label>
              <Form.Select aria-label="tipo" value={state.tipo} onChange={(e) => onUpdate(e, 'tipo')}>
                <option>Escolha o tipo </option>
                <option value="ACADEMICO">ACADEMICO</option>
                <option value="ORGANIZADOR">ORGANIZADOR</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type='password' placeholder='Senha'
                value={state.password} onChange={(e) => onUpdate(e, 'password')}
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              {t('actions.add')}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div >
  )
}

export default AddParticipantes
