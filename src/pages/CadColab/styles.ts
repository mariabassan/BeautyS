import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Content = styled.div`
margin-top: 50px;
.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 16rem));
  gap: 2rem;
  justify-content: center;
}

display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      align-items: center;
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    font-size: 30px;
  }

  > p {
    color: #999591;
  }

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

export const AvatarInput = styled.div`
  position: relative;
  margin-top: 100px;
  margin-bottom: 32px;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 20%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #ff9000;
    border: none;
    border-radius: 50%;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: background-color 0.3s;
    cursor: pointer;

    input {
      display: none;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }

    svg {
      color: #312e38;
    }
  }
`;
//ffc183