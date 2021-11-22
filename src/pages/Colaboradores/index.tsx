import React, { useState, useEffect} from 'react';
import 'react-day-picker/lib/style.css';

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

import {FiCalendar} from 'react-icons/fi';
//import { Link } from 'react-router-dom';
import * as S from './styles';

import api from '../../services/api';

import avatarUser from '../../assets/profile-user.png';
import addColaborador from '../../assets/addcolaborador.png';
import Menu from '../../components/menu/Navbar';
//import addC from '../../assets/but/add.png';

interface Cooperator {
  id: string;
  name: string;
  procedure: string;
  avatar: string;
}

const Colaboradores: React.FC = () => {

	const [cooperator, setCooperator] = useState<any[]>([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    async function loadCooperator(){
      const response = await api.get("/cooperator");
      setCooperator(response.data)
      setLoading(false);
      }
      loadCooperator();
    },[])

return (
<S.Container>
  <Menu/>
  <S.Section>
    <S.DivTitle><strong>Colaboradores</strong></ S.DivTitle>

      <S.Content>

      <S.CardColab className="wrapper">
        <CardDeck >
          <Card.Link className="card" href="/dashboard">
            <Card.Img className="card__image" src={addColaborador}/>
          </Card.Link>
        </CardDeck>
      {cooperator.map((coop) => (
        <CardDeck  key={coop._id}>
          <Card className="card" >
            <Card.Img className="card__image" variant="top" 
            src={coop.avatar || avatarUser}
            />
            <Card.Body>
              <Card.Title className="card__title">{coop.name}</Card.Title>
              <Card.Text className="card__description">
                {coop.procedure}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <button className="card__btn" type="button" onClick={event =>  window.location.href='/dashboard'}>Acessar agenda</button>
            </Card.Footer>
          </Card>
        </CardDeck>
      ))}
      </ S.CardColab>
      </S.Content>
  </S.Section>
</S.Container>

  );
}

export default Colaboradores;

//<Card.Link className="card__btn" href="/dashboard"><FiCalendar/>Acessar agenda</Card.Link>