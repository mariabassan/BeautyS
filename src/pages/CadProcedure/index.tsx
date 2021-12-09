import React, { useCallback, useRef, ChangeEvent } from 'react';
import {FiType, FiX, FiDollarSign} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';
import { Container, Content, Section} from './styles';

import Menu from '../../components/menu/Navbar';

interface CadProcedureFormData {
  name: string;
  price: string;
}

const CadProcedure: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: CadProcedureFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          price: Yup.string().required('Preço é obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/procedure', data);
        console.log(data);
        history.push('/procedures');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Procedimento cadastrado com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro do procedimento',
          description: 'Ocorreu um erro ao realizar o cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Menu/>
      <Section>
        <Content>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Cadastro de Procedimentos</h1>

            <Input name="name" icon={FiType} placeholder="Nome" />
            <Input name="price" icon={FiDollarSign} placeholder="Valor" />

            <Button type="submit">Cadastrar<Link to="/procedures"></Link></Button>
          </Form>

          <Link to="/procedures">
            <FiX />
            Cancelar
          </Link>

        </Content>
      </Section>

    </Container>
  );
};

export default CadProcedure;