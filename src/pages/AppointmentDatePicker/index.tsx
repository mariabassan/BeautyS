import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

import DateTimePicker from 'react-datetime-picker';
import { format } from 'date-fns';
//import ptBR from 'date-fns/locale/pt-BR';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import { useToast } from '../../hooks/toast';
import { useHistory, useLocation, Link } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiArrowLeft } from 'react-icons/fi';
import queryString from 'query-string';

import {
  Container,
  Header,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';

interface Cooperator {
    id: string;
    name: string;
    procedure: string;
    avatar: string;
  }

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const AppointmentDatePicker: React.FC = () => {
  const { user } = useAuth();
  const history = useHistory();

  //const routerParams = useLocation().pathname;
  const Params = queryString.stringify(queryString.parse(useLocation().search));

  console.log(Params);
  
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  //const cooperatorId = new URLSearchParams(Params);

  const [selectedProvider, setSelectedProvider] = useState<String>(
    Params,
  );

  const minimumDate = useMemo(() => {
    const today = new Date();

    if (today.getHours() >= 17) {
      return new Date(today.setDate(today.getDate() + 1));
    }

    return today;
  }, []);

  const [selectedDate, setSelectedDate] = useState(minimumDate);
  const [selectedHour, setSelectedHour] = useState(0);

  const [cooperator, setCooperator] = useState<Cooperator[]>([]);
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);

  useEffect(() => {
    api.get('/cooperator').then((response) => {
        setCooperator(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${Params}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        setAvailability(response.data);
        setSelectedHour(0);
      });
  }, [Params, selectedDate]);

  const handleSelectProvider = useCallback((Params: string) => {
    setSelectedProvider(Params);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('appointments', {
        cooperator_id: selectedProvider,
        date,
      });

      addToast({
        type: 'success',
        title: 'Agendamento concluído!',
        description:
          'Seu agendamento foi realizado com sucesso.',
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
        return;
      }

      addToast({
        type: 'error',
        title: 'Erro ao criar agendamento',
        description:
          'Ocorreu um erro ao tentar criar o agendamento, tente novamente!',
      });
    }

    history.push('/agenda');

  }, [Params, selectedDate, selectedHour, history, addToast]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => ({
        hour,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        available,
      }));
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => ({
        hour,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        available,
      }));
  }, [availability]);

  return (
    <>
      <Header>
        <Link to="/agenda">
            <FiArrowLeft size={32} />
        </Link>
        <HeaderTitle>Novo agendamento</HeaderTitle>


        <UserAvatar><img
            src={user.avatar_url}
            alt={user.name}
          /> 
        </UserAvatar>
      </Header>
      <Container>
        <ProvidersListContainer>
        {cooperator.map((coop) => (
          <ProvidersList key={coop.id}>
              <ProviderContainer selected={coop.id === selectedProvider}>
                onClick={() => handleSelectProvider(coop.id)}
              <ProviderAvatar>
                <img
                  src={`http://localhost:3333/files/${coop.avatar}`}
                  alt={coop.name}
                />
              </ProviderAvatar>
              <ProviderName selected={coop.id === selectedProvider}>
                {coop.name}
              </ProviderName>
              </ProviderContainer>
          </ProvidersList>
        ))}
        </ProvidersListContainer>

        <Calendar>
          <Title>Escolha a data</Title>

          <DateTimePicker
            name="date"
            format="dd-MM-y HH:mm"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            maxDate={minimumDate}
          />
        </Calendar>

        <Schedule>
          <Title>Escolha o horário</Title>

          <Section>
            <SectionTitle>Manhã</SectionTitle>

            <SectionContent>
              {morningAvailability.map(({ hourFormatted, hour, available }) => (
                <Hour
                  available={available}
                  selected={hour === selectedHour}
                  onClick={() => setSelectedHour(hour)}
                  key={hourFormatted}
                >
                  <HourText selected={hour === selectedHour}>
                    {hourFormatted}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>

            <SectionContent>
              {afternoonAvailability.map(
                ({ hourFormatted, hour, available }) => (
                  <Hour
                    available={available}
                    selected={hour === selectedHour}
                    onClick={() => setSelectedHour(hour)}
                    key={hourFormatted}
                  >
                    <HourText selected={hour === selectedHour}>
                      {hourFormatted}
                    </HourText>
                  </Hour>
                ),
              )}
            </SectionContent>
          </Section>
        </Schedule>

        <CreateAppointmentButton onClick={handleCreateAppointment}>
          <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Container>
    </>
  );
};

export default AppointmentDatePicker;