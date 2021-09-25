import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Profile from '../pages/Profile';
import CadEstab from '../pages/CadEstab';
import Colaboradores from '../pages/Colaboradores';
import CadColab from '../pages/CadColab';
import Dash1 from '../pages/Dashboard2';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />
    <Route path="/cad-estab" component={CadEstab}/>

    <Route path="/colaboradores" component={Colaboradores} isPrivate />
    <Route path="/cadcolaborador" component={CadColab}is-private/>
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/dashboard2" component={Dash1} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
  </Switch>
);

export default Routes;
