import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Agenda from '../pages/Agenda';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Profile from '../pages/Profile';
import CadEstab from '../pages/CadEstab';
import Colaboradores from '../pages/Colaboradores';
import CadColab from '../pages/CadColab';
import DashAlt from '../pages/Dashboard2';
import Dash from '../pages/Dashboard3';
import Procedure from '../pages/Procedures';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />
    <Route path="/cad-estab" component={CadEstab} isPrivate/>

    <Route path="/colaboradores" component={Colaboradores} isPrivate />
    <Route path="/cadcolaborador" component={CadColab}isPrivate/>
    <Route path="/procedures" component={Procedure} isPrivate />
    <Route path="/agenda" component={Agenda} isPrivate />
    <Route path="/dashboardAlt" component={DashAlt} isPrivate />
    <Route path="/dashboard" component={Dash} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
  </Switch>
);

export default Routes;
