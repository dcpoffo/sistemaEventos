import React, { useContext, useEffect, useRef, useState } from 'react'

import { TableData } from '../../../components';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { useAPI } from '../../../service/API';
import AuthContext from '../../../store/authContext';

import educameet from "../../../assets/img/educameet.png";
import CardHeader from 'react-bootstrap/esm/CardHeader';

import styles from './EditarParticipante.module.scss'
import { FaPlus } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

type ParticipanteData = {
  file?: any,
  name: string,
  tipo: string,
}

function EditarParticipante() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation()
  const [state, setState] = useState<ParticipanteData>(
    {
      name: '',
      tipo: '',
    })
  const auth = useContext(AuthContext);
  const api = useAPI();
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [profileImage, setProfileImage] = useState<any>(educameet);

  useEffect(() => {
    api.get('participantes/' + id, {}).then((res) => {
      setState({ name: res.data.name, tipo: res.data.tipo })
      setProfileImage(process.env.REACT_APP_BACK_HOST + 'files/' + res.data.profileImage.id)
    })
  }, [id])

  const updateState = (e: any, field: string) => {
    setState((state) => ({ ...state, [field]: e.target.value }))
  }

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
      setProfileImage(reader.result);
    }

    if (file) {
      setState((state) => ({ ...state, file }))
      reader.readAsDataURL(file);
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    
    if (state.name) {
      
      const bodyFormData = new FormData();
      bodyFormData.append("file", state.file);
      bodyFormData.append("name", state.name);
      bodyFormData.append("tipo", state.tipo);
      
      const htmlConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Acess-Control-Allow-Origin': '*',
          Authorization: auth.user?.basicAuth,
        },
      }
      
      api.put('participantes/' + id, state, htmlConfig).then(() => {
        navigate('/principal/participantes')
      })
    }
  }

  return (
    <div className={'container'}>
      <Card className={'col-lg-4 col-12 m-auto'}>
        <CardHeader>
          <Card.Title>{t('pages.participantes.edit')}</Card.Title>
        </CardHeader>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <div onClick={() => imageInputRef.current?.click()} className={styles.imageContainer}>
                <img
                  src={profileImage}
                  alt='profile image'
                  width={80}
                  height={80}
                  className='rounded-circle me-2'
                />
                <FaPlus className={styles.plusButton}/>
                <input
                  onChange={(e) => handleImageChange(e)}
                  ref={imageInputRef}
                  style={{display: 'none'}}
                  type='file'                  
                  accept={'image/png, image/jpg'}
                />
              </div>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicName'>
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
      </Card>
    </div >
  )
}

export default EditarParticipante
