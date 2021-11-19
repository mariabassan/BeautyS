import React from 'react'
import * as S from './styles';
import * as F from '../../pages/Dashboard2/styles';

import bAgenda from '../../assets/but/agenda.png';
import bColab from '../../assets/but/colab.png';
//import bProc from '../../assets/but/proc.png';
import bRelatorio from '../../assets/but/relatorio.png';

import { BrowserRouter as Router, NavLink, Link } from "react-router-dom";

import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import avatarUser from '../../assets/profile-user.png';

type Props = {
  open: boolean;
}

function RightNav(props: Props) {
  const { signOut, user} = useAuth();
  
  return (
    <Router>
      <S.Ul open={props.open}>
        <F.HeaderContent>
          <F.HeaderProfile>
            <img
              src={
              user.avatar_url ||
              avatarUser
              }
              alt={user.name}
            />
            <div>
              <span>Bem-vindo</span>
              <Link to="/profile">
              <strong>{user.name}</strong>
              </Link>
            </div>
          </F.HeaderProfile>
        </F.HeaderContent>
        <F.DivEmpty></F.DivEmpty>
        <NavLink to="/colaboradores"
            activeStyle={{
              fontWeight: "bold",
              color: "#0DADEA"
            }}
          >
            <li>
              <img
                src={bColab}
                alt='Colaboradores'/>
            </li>
        </NavLink>
        <NavLink to="/dashboard"
            activeStyle={{
              fontWeight: "bold",
              color: "#0DADEA"
            }}
          >
            <li><img
                src={bAgenda}
                alt='Agenda'/></li>
        </NavLink>
        <NavLink to="/dashboard2"
            activeStyle={{
              fontWeight: "bold",
              color: "#0DADEA"
            }}
          >
            <li><img
                src={bRelatorio}
                alt='Relatórios'/></li>
        </NavLink>
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
