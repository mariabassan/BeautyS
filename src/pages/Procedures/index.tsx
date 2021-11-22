import React, { useState, useEffect} from 'react';
import 'react-day-picker/lib/style.css';

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import * as S from './styles';
import api from '../../services/api';

import addProcedure from '../../assets/addcolaborador.png';
import Menu from '../../components/menu/Navbar';

interface Procedure {
  id: string;
  name: string;
  price: string;
}

const Procedure: React.FC = () => {

	const [procedure, setProcedure] = useState<any[]>([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    async function loadProcedure(){
      const response = await api.get("/procedure");
      setProcedure(response.data)
      setLoading(false);
      }
      loadProcedure();
    },[])

return (
<S.Container>
  <Menu/>
  <S.Section>
    <S.DivTitle><strong>Serviços</strong></ S.DivTitle>

      <S.Content>

      <S.CardProc className="wrapper">
        <CardDeck >
          <Card.Link className="card" href="/dashboard">
            <Card.Img className="card__image" src={addProcedure}/>
          </Card.Link>
        </CardDeck>
      {procedure.map((proc) => (
        <CardDeck  key={proc._id}>
          <Card className="card" >
            <Card.Img className="card__image" variant="top"/>
            <Card.Body>
              <Card.Title className="card__title">{proc.name}</Card.Title>
              <Card.Text className="card__description">
                {proc.price}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <button className="card__btn" type="button"></button>
            </Card.Footer>
          </Card>
        </CardDeck>
      ))}
      </ S.CardProc>
      </S.Content>
  </S.Section>
</S.Container>

  );
}

export default Procedure;