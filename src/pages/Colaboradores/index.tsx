import React, { useState, useEffect} from 'react';
import 'react-day-picker/lib/style.css';

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

import { useHistory } from 'react-router-dom';
import * as S from './styles';

import api from '../../services/api';

import avatarUser from '../../assets/profile-user.png';
import addColaborador from '../../assets/addcolaborador.png';
import Menu from '../../components/menu/Navbar';

interface Cooperator {
  id: string;
  name: string;
  procedure: string;
  avatar: string;
}

const Colaboradores: React.FC = () => {

	const [cooperator, setCooperator] = useState<any[]>([]);
  const [ loading, setLoading ] = useState(true);

  const history = useHistory();
  //const routerParams = useLocation();

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
            src={`http://localhost:3333/files/${coop.avatar}`}
            alt={coop.name}
            />
            <Card.Body>
              <Card.Title className="card__title">{coop.name}</Card.Title>
              <Card.Text className="card__description">
                {coop.procedure}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
            <button className="card__btn" type="button" onClick={() => {
                history.push(`/${coop.id}/`);
                //console.log(history);
                }}>
                Acessar agenda
              </button>
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
//<button className="card__btn" type="button" key={coop._id} onClick={event =>  window.location.href='/agenda'}>Acessar agenda</button>
//<Link to={'/agendaColab/' + coop._id} className='card__btn'>Acessar agenda</Link> 
//<Link to='/agendaColab?q=coop._id'> </Link>

/*<button className="card__btn" type="button" onClick={() => {
                history.push(`/agendaColab/${coop.id}`);
                console.log(history);
                }}>
                Acessar agenda
              </button>*/
/*history.push({
                  pathname: `/agendaColab/${coop.id}`,
                  //search: ``,
                });*/