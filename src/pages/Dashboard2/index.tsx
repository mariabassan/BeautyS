//import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
//import PowerbiEmbedded from 'react-powerbi';


import * as S from './styles';

import Menu from '../../components/menu/Navbar';

const Relatorios: React.FC = () => {

  return (
    <S.Container>
      <Menu />     

      <S.Content>
      <iframe title="BI_TCC" width="1280" height="1080" 
      src="https://app.powerbi.com/reportEmbed?reportId=9bfca80f-bed4-47eb-a986-d3485353f39b&autoAuth=true&ctid=080bc023-5e5a-46fb-bbe8-eb548e9873a6&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWJyYXppbC1zb3V0aC1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D" 
      >
      </iframe>
      </S.Content>
    </S.Container>
  );
};

export default Relatorios;
