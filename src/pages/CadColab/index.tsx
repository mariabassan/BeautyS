import React, { useCallback, useRef } from 'react';
import {FiType, FiX} from 'react-icons/fi';
import {TiSortNumerically} from 'react-icons/ti';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import { Container, Content, AnimationContainer} from './styles';

import logoImg from '../../assets/logo444.png';
import Menu from '../../components/menu/Navbar';

interface CadColabFormData {
  nome: string;
  email: string;
  phone: string;
  procedure: string;
}

const CadColab: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { signOut, user } = useAuth();

  const handleSubmit = useCallback(
    async (data: CadColabFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required('CNPJ é obrigatório'),
          email: Yup.string().required('Nome Fantasia é obrigatório'),
          phone: Yup.string().required('Razão Social é obrigatório'),
          procedure: Yup.string(),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/cooperator', data);

        history.push('/colaboradores');

        addToast({
          type: 'success',
          title: 'Cadastro do colaborador realizado!',
          description: 'BeautyScheduler!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro do colaborador',
          description: 'Ocorreu um erro ao realizar o cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Menu/>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="BeautyS" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Cadastro de colaboradores</h1>

            <Input name="nome" icon={FiType} placeholder="Nome Completo" />
            <Input name="email" icon={FiType} placeholder="E-Mail" />
            <Input name="phone" icon={TiSortNumerically} placeholder="Telefone" />
            <Input name="procedure" icon={FiType} placeholder="Procedimento principal" />

            <Button type="submit">Salvar</Button>
          </Form>

          <Link to="/colaboradores">
            <FiX />
            Cancelar
          </Link>

        </AnimationContainer>
      </Content>

    </Container>
  );
};

export default CadColab;