import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProcedureController from '@modules/procedure/infra/http/controllers/ProcedureController';
import ListProcedureController from '@modules/procedure/infra/http/controllers/ListProcedureController';
//import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

//import ensureAuthenticade from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const procedureRouter = Router();
const procedureController = new ProcedureController();
const listprocedureController = new ListProcedureController();

//procedureRouter.use(ensureAuthenticade);

procedureRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      valor: Joi.string().required(),
      duracao: Joi.string().required(),
    },
  }),
  procedureController.create,
);
procedureRouter.get('/me', listprocedureController.index);

export default procedureRouter;
