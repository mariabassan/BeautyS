import React from 'react';
import * as S from './styles';

import logoImg from '../../assets/logo.png';
import Burger from './Burger';
import { useHistory } from 'react-router-dom';

type Props = {
  children?: any;
}

export default function Navbar(props: Props) {
  const history = useHistory();
  return (
    <>
      <S.Nav>
        <S.Logo src={logoImg} alt="Beauty Scheduler" onClick={() => {
                history.push(`/dashboard`);}}/>
      </S.Nav>
      <Burger />
      {props.children}
    </>
  )
}