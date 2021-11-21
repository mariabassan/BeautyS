import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import 'react-day-picker/lib/style.css';

import Carousel from 'react-bootstrap/Carousel'

import * as S from './styles';

import galeria1 from '../../assets/galeria1.png';
import galeria2 from '../../assets/galeria2.png';
import galeria3 from '../../assets/galeria3.png';

import Menu from '../../components/menu/Navbar';

const Dash1: React.FC = () => {

  return (
    <S.Container>
      <Menu />     

      <S.Content>
      <Carousel fade>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={galeria1}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3></h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={galeria2}
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3></h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={galeria3}
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3></h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </S.Content>
    </S.Container>
  );
};

export default Dash1;
