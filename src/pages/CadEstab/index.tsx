import React, { useCallback, useRef } from 'react';
import {FiArrowLeft, FiType } from 'react-icons/fi';
import {TiSortNumerically, TiWorld} from 'react-icons/ti';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';
//import { useAuth } from '../../hooks/auth';
import { Container, Content, AnimationContainer, Background } from './styles';

import logoImg from '../../assets/logo.png';

interface CadEstabFormData {
  cnpj: string;
  nomeFantasia: string;
  razaoSocial: string;
  telefone: string;
  cep: string;
  endereco: string;
  cidade: string;
  uf: string;
  //favorite: string;
}

const CadEstab: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  //const { signOut, user } = useAuth();

  const handleSubmit = useCallback(
    async (data: CadEstabFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          cnpj: Yup.string().required('CNPJ é obrigatório'),
          nomeFantasia: Yup.string().required('Nome Fantasia é obrigatório'),
          razaoSocial: Yup.string().required('Razão Social é obrigatório'),
          telefone: Yup.string(),
          cep: Yup.string().required('CEP é obrigatório'),
          endereco: Yup.string().required('Endereço é obrigatório'),
          //numero: Yup.string().required('Número obrigatório'),
          cidade: Yup.string().required('Cidade é obrigatório'),
          uf: Yup.string().required('Estado é obrigatório'),
          //ramo: Yup.string().required('Ramo é obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/establishment', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro do estabelecimento realizado!',
          description: 'Podemos prosseguir para o seu início no BeautyScheduler!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro do estabelecimento',
          description: 'Ocorreu um erro ao realizar o cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="BeautyS" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Cadastre o seu estabelecimento</h1>

            <Input name="cnpj" icon={TiSortNumerically} placeholder="CNPJ" />
            <Input name="nomeFantasia" icon={FiType} placeholder="Nome Fantasia" />
            <Input name="razaoSocial" icon={FiType} placeholder="Razão Social" />
            <Input name="telefone" icon={TiSortNumerically} placeholder="Telefone" />
            <Input name="cep" icon={TiSortNumerically} placeholder="CEP" />
            <Input name="endereco" icon={TiWorld} placeholder="Endereço" />
            <Input name="cidade" icon={TiWorld} placeholder="Cidade" />
            <Input name="estado" icon={TiWorld} placeholder="UF" />

            <Button type="submit">Cadastrar<Link to="/"></Link></Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para login
          </Link>

        </AnimationContainer>
      </Content>

      <Background />

    </Container>
  );
};

export default CadEstab;

//max 1058 x 1117