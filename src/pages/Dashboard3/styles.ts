import styled from 'styled-components'

import agendamentoImg from '../../assets/BackgroundsTCC/agendamento.png';
import colaboradoresImg from '../../assets/BackgroundsTCC/colaboradores.png';
import procedimentosImg from '../../assets/BackgroundsTCC/procedimentos.png';
import agendaImg from '../../assets/BackgroundsTCC/agendas.png';
import relatoriosImg from '../../assets/BackgroundsTCC/relatorios.png';
import sobreImg from '../../assets/BackgroundsTCC/sobre.png';

export const Container = styled.div`
  .back:nth-child(1) {
    background-image: url(${agendamentoImg});
    background-size: 99% 100%;
  }
  .back:nth-child(2) {
    background-image: url(${colaboradoresImg});
    background-size: 99% 100%;
  }
  .back:nth-child(3) {
    background-image: url(${procedimentosImg});
    background-size: 99% 100%;
  }
  .back:nth-child(4) {
    background-image: url(${agendaImg});
    background-size: 99% 100%;
  }
  .back:nth-child(5) {
    background-image: url(${relatoriosImg});
    background-size: 99% 100%;
  }
  .back:nth-child(6) {
    background-image: url(${sobreImg});
    background-size: 99% 100%;
  }
`

export const Spacer = styled.div`
  height: 10vh;
  background: ##F4DFD9;
`