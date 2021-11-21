import React from 'react'
import { useTransform } from 'framer-motion'

import { useWrapperScroll } from '../../Model'

import { Container, Header, Logo, Footer} from './styles'
import logoBS from '../../assets/logo.png'

import Burger from '../menu/Burger';

const UniqueOverlay: React.FC = () => {
  const { scrollYProgress } = useWrapperScroll()

  const opacity = useTransform(scrollYProgress, [0.9, 1], [0, 1])

  return (
    <Container>
      <Header>
        <Logo src={logoBS} alt="Beauty Scheduler" />
        <Burger />
      </Header>

      <Footer style={{ opacity }}>
        <ul>
          <li>
            <a href="/dashboard3">PUC Campinas</a>
          </li>
          <li>
            <a href="/dashboard3">Projeto de Conclusão de Curso</a>
          </li>
          <li>
            <a href="/dashboard3">Sistemas de Informação 2021</a>
          </li>
        </ul>
      </Footer>
    </Container>
  )
}

export default UniqueOverlay
