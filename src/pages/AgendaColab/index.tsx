import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { useLocation, useHistory } from 'react-router-dom';

import { FiClock } from 'react-icons/fi';
import * as S from './styles';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import Menu from '../../components/menu/Navbar';
import userIcon from '../../assets/user2.png'

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    id: string;
    name: string;
    avatar_url: string;
  };
  useradmin: {
    id: string;
    name: string;
    avatar_url: string;
  };
}
//:cooperator_id/month-availability
const AgendaColab: React.FC = () => {
  const { user } = useAuth();
  const routerParams = useLocation().pathname;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  console.log(routerParams);
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  //const cooperatorId = new URLSearchParams(routerParams);
  //console.log(cooperatorId);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => setMonthAvailability(response.data));
  }, [currentMonth, user.id]);

  useEffect(() => {
    api
      .get<Appointment[]>(`/appointments/${routerParams}`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        const appointmentsFormatted = response.data.map(appointment => ({
          ...appointment,
          hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
        }));

        setAppointments(appointmentsFormatted);
        //console.log(cooperatorId);
      });
  }, [selectedDate]);
  console.log(appointments);
  const disableDays = useMemo(() => {
    return monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR });
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() >= 12;
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment =>
      isAfter(parseISO(appointment.date), new Date()),
    );
  }, [appointments]);

  return (
    <S.Container>
      <Menu/>

      <S.Content>
        <S.Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{`${selectedWeekDay}-feira`}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <S.NextAppointment>
              <strong>Atendimento a seguir</strong>
              <div>
                <img
                  src={ nextAppointment.user?.avatar_url || nextAppointment.useradmin?.avatar_url }
                  alt={ nextAppointment.user?.name || nextAppointment.useradmin?.name }
                />

                <strong>{ nextAppointment.user?.name || nextAppointment.useradmin?.name }</strong>
                <span>
                  <FiClock size={24} />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </S.NextAppointment>
          )}

          <S.Section>
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}

            {morningAppointments.map(appointment => (
              <S.Appointment key={appointment.id}>
                <span>
                  <FiClock size={20} />
                  {appointment.hourFormatted}
                </span>

                <div>
                <img
                    src={ appointment.user?.avatar_url|| appointment.useradmin?.avatar_url }
                    alt={ appointment.user?.name || appointment.useradmin?.name }
                  />

                  <strong>{ appointment.user?.name || appointment.useradmin?.name }</strong>
                </div>
              </S.Appointment>
            ))}
          </S.Section>
          <S.Section>
            <strong>Tarde</strong>

            {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}

            {afternoonAppointments.map(appointment => (
              <S.Appointment key={appointment.id}>
                <span>
                  <FiClock size={20} />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img
                    src={ appointment.user?.avatar_url|| appointment.useradmin?.avatar_url }
                    alt={ appointment.user?.name || appointment.useradmin?.name }
                  />

                  <strong>{ appointment.user?.name || appointment.useradmin?.name }</strong>
                </div>
              </S.Appointment>
            ))}
          </S.Section>
        </S.Schedule>
        <S.Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disableDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </S.Calendar>
      </S.Content>
    </S.Container>
  );
};

export default AgendaColab;
