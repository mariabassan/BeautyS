import React, { useState, useEffect} from 'react';
import 'react-day-picker/lib/style.css';

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

import {FiCalendar, FiPlus} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import * as S from './styles';

import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import avatarUser from '../../assets/profile-user.png';
import { Content } from '../SignIn/styles';
import Menu from '../../components/menu/Navbar';
import addC from '../../assets/but/add.png';

interface Cooperator {
  id: string;
  name: string;
  procedure: string;
  avatar: string;
}

const Colaboradores: React.FC = () => {
  const { signOut, user} = useAuth();

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
      <Menu />
      <S.Section>
        <Content>
          <CardDeck>
             {cooperator.map((coop) => (
                <Card key={coop._id}>
                  <Card.Img variant="top" 
                  src={coop.avatar || avatarUser}
                  />
                  <Card.Body>
                    <Card.Title>{coop.name}</Card.Title>
                    <Card.Text>
                      {coop.procedure}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Card.Link href="/dashboard"><FiCalendar/></Card.Link>
                  </Card.Footer>
                </Card>
              ))}
          </CardDeck>
        </Content>
      </S.Section>
    </S.Container>
  );
}

export default Colaboradores;