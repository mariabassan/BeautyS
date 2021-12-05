import React, { useCallback, useRef, useEffect, useState } from 'react';
import { FiUser, FiArrowLeft, FiCalendar } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';

import { Container, Content, AvatarInput } from './styles';

interface ProfileFormData {
  cooperator: string;
  date: string;
}

interface Cooperator {
    id: string;
    name: string;
    procedure: string;
    avatar: string;
}

const AddAppoinment: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const [cooperator, setCooperator] = useState<Cooperator[]>([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    async function loadCooperator(){
      const response = await api.get("/cooperator")
      setCooperator(response.data)
      setLoading(false);
      }
      loadCooperator();
    },[])

  const validCoop = cooperator.map(({ id }) => id);

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          cooperator: Yup.string()
          .required("Selecione um colaborador")
          .oneOf(validCoop),  
          date: Yup.string().required('Horáro obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        const {
          cooperator,
          date
        } = data;

        const formData = {
            cooperator,
            date
        };

        const response = await api.post('/appointments', formData);
        console.log(response);

        history.push('/agenda');

        addToast({
          type: 'success',
          title: 'Agendamento concluído!',
          description:
            'Seu agendamento com foi concluído com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no agendamento',
          description:
            'Ocorreu um error ao criar o agendamento, tente novamente.',
        });
      }
    },
    [addToast],
  );

  const coopOptions = cooperator.map((coop) => (
    <option value={coop.name} key={coop.id}>
      {coop.name}
    </option>
  ));

  return (
    <Container>
      <header>
        <div>
          <Link to="/agenda">
            <FiArrowLeft size={32} />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
        >
        {cooperator.map((coop) => (
          <AvatarInput>
            <img
              src={`http://localhost:3333/files/${coop.avatar}`}
              alt={coop.name}
            />
          </AvatarInput>
          ))};
          <h1>Novo agendamento</h1>

          <Input name="cooperator" icon={FiUser} placeholder="Colaborador">
          <option value={""}>Selecione o colaborador</option>
                {coopOptions}
          </Input>

          <Input name="date" icon={FiCalendar} placeholder="Data" />

          <Button type="submit">Confirmar alterações</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default AddAppoinment;
