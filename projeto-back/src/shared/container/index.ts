import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import ICooperatorRepository from '@modules/cooperator/repositories/ICooperatorRepository';
import CooperatorRepository from '@modules/cooperator/infra/typeorm/repositories/CooperatorRepository';

import IEstablishmentRepository from '@modules/establishment/repositories/IEstablishmentRepository';
import EstablishmentRepository from '@modules/establishment/infra/typeorm/repositories/EstablishmentRepository';

//import IEstablishmentTokensRepository from '@modules/establishment/repositories/IEstablishmentTokensRepository';
//import EstablishmentTokensRepository from '@modules/establishment/infra/typeorm/repositories/EstablishmentTokensRepository';

import IProcedureRepository from '@modules/procedure/repositories/IProcedureRepository';
import ProcedureRepository from '@modules/procedure/infra/typeorm/repositories/ProcedureRepository';


container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

container.registerSingleton<ICooperatorRepository>(
  'CooperatorRepository',
  CooperatorRepository,
);

container.registerSingleton<IProcedureRepository>(
  'ProcedureRepository',
  ProcedureRepository,
);

container.registerSingleton<IEstablishmentRepository>(
  'EstablishmentRepository',
  EstablishmentRepository,
);

/*container.registerSingleton<IEstablishmentTokensRepository>(
  'EstablishmentTokensRepository',
  EstablishmentTokensRepository,
);*/