import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signUpBackgroundImg from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: auto;

  display: flex;
  align-items: stretch;
  button{
    width: 200px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 80%;
  max-width: 750px;
  margin-left: -50px;
  margin-right: -50px;

  background-color: rgba(244,255,253, 0.9);
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  animation: ${appearFromRight} 1s;

  img {
    width: 350px;
    margin-bottom: 80px;
  }

  form {
    margin: 10px 0;
    width: 450px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
    }
  }

  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    margin-bottom: 24px;
    text-decoration: none;
    transition: color 0.3s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 10px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover;
`;


//ffc183