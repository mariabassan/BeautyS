import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

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
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 70%;
  max-width: 750px;
  margin-left: -50px;
  margin-right: -50px;

  background: #fff1e3;
`;

const appearFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px)
  }
  to {
    opacity: 1;
    transform: translateY(0)
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  animation: ${appearFromBottom} 1s;

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
//ffc183