import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
//---
import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
//import DateTimePicker from 'react-datetime-picker';
//---
import { useRoute, useNavigation } from '@react-navigation/native';
import { useHistory } from 'react-router-dom';
//import { Alert } from 'react-native';
import { useToast } from '../../hooks/toast';
//---
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
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
  PrecedureList,
} from './styles';

export interface Cooperator {
  id: string;
  name: string;
  procedure: string;
  avatar_url: string;
}

interface RouteParams {
  cooperatorId: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const AppointmentDatePicker: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;
  const { addToast } = useToast();
  const history = useHistory();

  const [selectedProvider, setSelectedProvider] = useState<string>(
    params.cooperatorId,
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

  const [providers, setProviders] = useState<Cooperator[]>([]);
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const procedure = ['Corte', 'Manicure', 'Cabelo', 'Sobrancelha', 'Barba'];

  useEffect(() => {
    api.get('cooperator').then((response) => {
      setProviders(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${selectedProvider}/day-availability`, {
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
  }, [selectedProvider, selectedDate]);

  const handleSelectProvider = useCallback((cooperatorId: string) => {
    setSelectedProvider(cooperatorId);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('appointments', {
        cooperator_id: selectedProvider,
        user_id: user.id,
        procedure_id: procedure,
        date,
      });

      addToast({
        type: 'success',
        title: 'Agendamento concluído!',
        description:
          'Seu agendamento foi realizado com sucesso.',
      });
      //navigation.navigate('AppointmentCreated', { date: date.getTime() });
    } catch (err) {
        addToast({
            type: 'error',
            title: 'Erro ao criar agendamento',
            description:
              'Ocorreu um erro ao tentar criar o agendamento, tente novamente!',
          });
    }
  }, [selectedProvider, selectedDate, selectedHour, navigation]);

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
        <button type="button" onClick={() => history.goBack()}>
          <FiArrowLeft name="chevron-left" size={24} color="#999591" />
        </button>
        <HeaderTitle>Cabelereiros</HeaderTitle>

        <UserAvatar><img
            src={user.avatar_url}
            alt={user.name}/> 
        </UserAvatar>
      </Header>
      <Container>
        <ProvidersListContainer style={{ flex: 1, flexDirection: 'row' }}>
          <ProvidersList
            data={providers}
            keyExtractor={(provider) => provider.id}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                selected={provider.id === selectedProvider}
                onClick={() => handleSelectProvider(provider.id)}
              >
                <ProviderAvatar><img
                    src={user.avatar_url}
                    alt={user.name}/>
                </ProviderAvatar>
                <ProviderName selected={provider.id === selectedProvider}>
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
          <PrecedureList
            data={procedure}
            //keyExtractor={(provider) => provider.id}
            renderItem={({ item: procedure }) => (
              <ProviderContainer
                selected={procedure}
                onClick={() => (procedure)}
              >
                <ProviderName selected={procedure}>
                  {procedure}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>

        <Calendar>
          <Title>Escolha a data</Title>

          <DateTimePicker
            mode="date"
            is24Hour
            display="calendar"
            value={selectedDate}
            onChange={(_, date) => date && setSelectedDate(date)}
            minimumDate={minimumDate}
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