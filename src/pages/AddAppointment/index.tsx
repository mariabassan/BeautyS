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
import { useAuth } from '../../hooks/auth';

import { Container, Content, AvatarInput, Section } from '../CadColab/styles';
import userIcon from '../../assets/user2.png'

interface AppointmentFormData {
  cooperator: string;
  date: Date;
  user_id: string;
  procedure_id: string;
}

/*interface Cooperator {
    id: string;
    name: string;
    procedure: string;
    avatar: string;
}*/

const AddAppoinment: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { user } = useAuth();

  /*const [cooperator, setCooperator] = useState<Cooperator[]>([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    async function loadCooperator(){
      const response = await api.get("/cooperator")
      setCooperator(response.data)
      setLoading(false);
      }
      loadCooperator();
    },[])

  const idCoop = cooperator.map((coop) => coop.id);
  const nameCoop = cooperator.map((coop) => coop.name);
  const procedureCoop = cooperator.map((coop) => coop.procedure);*/

    const handleSubmit = useCallback(
    async (data: AppointmentFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          cooperator: Yup.string().required("Selecione um colaborador").oneOf(nameCoop),  
          date: Yup.date().required('Horáro obrigatório'),
          procedure_id: Yup.string().required("Selecione um colaborador").oneOf(procedureCoop),
        });

        await schema.validate(data, { abortEarly: false });

        /*const {
          cooperator,
          date,
          user_id,
          procedure_id
        } = data;

        const formData = {
            cooperator,
            date,
            user_id: user.id,
            procedure_id: procedureCoop,
        };*/

        await api.post('/appointments', data);
        console.log(data);

        history.push('/');

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
    [addToast, history],
  );

  /*const coopOptions = cooperator.map((coop) => (
    <option value={coop.name} key={coop.id}>
      {coop.name}
    </option>
  ));*/

  const nameCoop = ['Mariana', 'Clarice', 'Angela', 'Beto Morais', 'Flavio Morais'];
  const procedureCoop = ['Corte', 'Manicure', 'Cabelo', 'Sobrancelha', 'Barba'];

  return (
    <Container>
      <header>
        <div>
          <Link to="/agenda">
            <FiArrowLeft size={32} />
          </Link>
        </div>
      </header>
      <Section>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <AvatarInput>
            <img
              src={userIcon}
              alt={'FOTO'}
            />
          </AvatarInput>
          <h1>Novo agendamento</h1>

          <Input name="cooperator" icon={FiUser} placeholder="Colaborador">
          <option value={nameCoop}>Selecione o colaborador</option>
          </Input>

          <Input name="date" icon={FiCalendar} placeholder="Data" />

          <Input name="procedure_id" icon={FiUser} placeholder="Procedimento">
          <option value={procedureCoop}>Selecione o procedimento</option>
          </Input>
          <Button type="submit">Confirmar alterações</Button>
        </Form>
      </Content>
      </Section>
    </Container>
  );
};

export default AddAppoinment;
/*<Container>
      <header>
        <div>
          <Link to="">
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
      </Section>
    </Container>*/