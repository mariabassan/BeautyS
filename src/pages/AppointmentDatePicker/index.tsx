import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { format } from 'date-fns';
//import DateTimePicker from '@react-native-community/datetimepicker';
//import DateTimePicker from 'react-datetime-picker';
import DatePicker from 'react-date-picker';
//import { useRoute, useNavigation, Link } from '@react-navigation/native';
import { useHistory, useParams } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import Menu from '../../components/menu/Navbar';
import {
  Container,
  HeaderTitle,
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
  Content,
} from './styles';

export interface Cooperator {
  id: string;
  name: string;
  procedure_id: string;
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
  const { cooperatorId } = useParams() as RouteParams;
  const { addToast } = useToast();
  const history = useHistory();

  //console.log(cooperatorId);

  const [selectedProvider, setSelectedProvider] = useState<string>(
    cooperatorId,
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
  //const procedure = ['Corte', 'Manicure', 'Cabelo', 'Sobrancelha', 'Barba'];

/*async function loadCooperator(){
      const response = await api.get("/cooperator");
      setCooperator(response.data)
      setLoading(false);
      }
      loadCooperator();
    },[])*/

  useEffect(() => {
    async function loadCooperator(){
      const response = await api.get(`cooperator`);
      setProviders(response.data);
    }
    loadCooperator();
  }, []);

  //console.log(providers[0]?.procedure_id);
  //console.log(providers.map((prov) => (prov.procedure_id)));
  //console.log(providers.filter(prov => prov.id === selectedProvider).map((prov) => (prov.procedure_id)));

  const procedure = providers.filter(prov => prov.id === selectedProvider).map((prov) => (prov.procedure_id));

  console.log(String(procedure));

  useEffect(() => {
    async function loadDay(){
      const response = await api.get(`/providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      });
        setAvailability(response.data);
        setSelectedHour(0);
      }
      loadDay()
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
        procedure_id: String(procedure),
        date,
      });

      addToast({
        type: 'success',
        title: 'Agendamento concluído!',
        description:
          'Seu agendamento foi realizado com sucesso.',
      });

      history.push(`/${selectedProvider}`, { date: date.getTime() });
    } catch (err) {
        addToast({
            type: 'error',
            title: 'Erro ao criar agendamento',
            description:
              'Ocorreu um erro ao tentar criar o agendamento, tente novamente!',
          });
          /*addToast({
            type: 'success',
            title: 'Agendamento concluído!',
            description:
              'Seu agendamento foi realizado com sucesso.',
          });
          history.push(`/${selectedProvider}`);*/
    }
  }, [selectedProvider, selectedDate, selectedHour, history, addToast]);

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
      <Container>
      <Menu/>
      <Content>
        <HeaderTitle>Cabelereiros</HeaderTitle>
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
                      src={provider.avatar_url}
                      alt={provider.name}/>
                  </ProviderAvatar>
                  <ProviderName selected={provider.id === selectedProvider}>
                    {provider.name}
                  </ProviderName>
                </ProviderContainer>
              )}
            />
        </ProvidersListContainer>
          <Calendar>
            <Title>Escolha a data</Title>

            <DatePicker
              value={selectedDate}
              onChange={(date: Date) => setSelectedDate(date)}
              minDate={minimumDate}
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
        </Content>
      </Container>
    </>
  );
};

export default AppointmentDatePicker;

/*<button type="button" onClick={() => history.goBack()}>
          <FiArrowLeft name="chevron-left" size={24} color="#999591" />
        </button>

<UserAvatar><img
            src={user.avatar_url}
            alt={UserAvatar.name}/> 
        </UserAvatar>*/