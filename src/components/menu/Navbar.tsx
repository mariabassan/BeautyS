import React from 'react';
import * as S from './styles';

import logoImg from '../../assets/logo.png';
import Burger from './Burger';

type Props = {
  children?: any;
}

export default function Navbar(props: Props) {
  return (
    <>
      <S.Nav>
        <S.Logo src={logoImg} alt="Beauty Scheduler" />
      </S.Nav>
      <Burger />
      {props.children}
    </>
  )
}