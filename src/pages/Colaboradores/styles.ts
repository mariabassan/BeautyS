import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background-color: rgba(244,255,253, 0.9);
`;

export const DivTitle = styled.div`
  max-width: 1120px;
  display: flex;
  justify-content: center;
  
  > strong {
  color: #ff9000;
  font: 30px Hanuman;
  }
`;

export const Content = styled.main`
  margin: 2rem;
  .wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 16rem));
    gap: 2rem;
    justify-content: center;
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
`;

export const CardColab = styled.div`
  .card {
    overflow: hidden;
    box-shadow: 0 2px 20px #767b91;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 200ms ease-in;
    margin: 1rem;
    backgroung-color:#F8F5F3;


    &__image {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    &__title {
      padding: 1rem;
    }

    &__description {
      padding: 0 1rem;
    }

    &__btn {
      padding: 1rem;
      font-family: inherit;
      font-weight: bold;
      font-size: 1rem;
      margin: 1rem;
      
      background: transparent;
      color: #9C714F;
      border-radius: 0.2rem;
      transition: background 200ms ease-in, color 200ms ease-in;

      &:hover{
        background: #9C714F;
        color: #EBE3DD;
      }
    }

    &:hover {
      transform: scale(1.02);
    }

`;