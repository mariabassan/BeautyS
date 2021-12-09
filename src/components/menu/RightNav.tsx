import React from 'react'
import * as S from './styles';
import * as F from '../../pages/Dashboard2/styles';

import { BrowserRouter as Router, useHistory } from "react-router-dom";

import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
//import avatarUser from '../../assets/profile-user.png';

type Props = {
  open: boolean;
}

function RightNav(props: Props) {
  const { signOut, user} = useAuth();
  const history = useHistory();

  return (
    <Router>
      <S.Ul open={props.open}>
        <F.HeaderContent>
        <li>
          <F.HeaderProfile>
            <img
              src={
              user.avatar_url
              }
              alt={user.name}
            />
            <div>
              <span>Bem-vindo</span>
              <button className="button-profile" type="button" onClick={() => {
                history.push(`/profile`);}}><strong>{user.name}</strong></button>
            </div>
          </F.HeaderProfile>
          </li>
          </F.HeaderContent>
          
            <li>
            <button className="button-menu" type="button" onClick={() => {
                history.push(`/colaboradores`);}}>
                  COLABORADORES
            </button>
            </li>
            <li>
            <button className="button-menu" type="button" onClick={() => {
                history.push(`/procedures`);}}>
                  PROCEDIMENTOS
            </button>
            </li>
            <li>
            <button className="button-menu" type="button" onClick={() => {
                history.push(`/agenda`);}}>
                  AGENDA
            </button>
            </li>
            <li>
            <button className="button-menu" type="button" onClick={() => {
                history.push(`/relatorios`);}}>
                  RELATORIOS
            </button>
            </li>
        <li>
          <F.ButtonOff>
            <button type="button" onClick={signOut}>
              <FiPower size={25} />
            </button>
          </F.ButtonOff>
        </li>
        
      </S.Ul>      
    </Router >
  )
}

export default RightNav
