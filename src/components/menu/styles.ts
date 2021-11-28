import styled from 'styled-components';
import butColab from '../../assets/but/colab.png';


interface INav {
  open: boolean;
  href?: string;
}

export const StyledBurger = styled.div<INav>`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;
  z-index: 20;
  display: none;
  font-family: 'Zilla Slab';

  @media (max-width: 1220px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${(props) => props.open ? '#000' : '#000'};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    cursor: pointer;
    &:nth-child(1) {
      transform: ${(props) => props.open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${(props) => props.open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${(props) => props.open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${(props) => props.open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`

export const Nav = styled.nav`
  font-family: Hanuman;  
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-color: rgba(244,255,253, 0.9);
  align-items: center;
  position: relative;

  @media (max-width: 1220px) {
    width: 100vw;
  }

  span {
    font-size: 20px;
    @media only screen and (max-width: 600px) {
      font-size: 20px;
      :nth-child(2) {
        font-size: 16px !important;
        margin-top: 0px !important;
      }
    }
  }

`

export const Ul = styled.ul<INav>`
  font-family: Hanuman;
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  position: absolute;
  width: 90%;
  top: 0;
  justify-content: flex-end;
  margin-top: 55px;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  height: 110px;
  margin-left: 20px;

  a {
    text-decoration: none;
    text-transform: none;
    color: #000;
    cursor: pointer;

    &:hover {
      color: #0DADEA;
    }
  }

  li {
    padding: 18px 15px;
  }

  .button-menu{
      padding: 0.5rem;
      font-family: Hanuman;
      font-weight: bold;
      font-size: 15px;
      background: transparent;
      border: 0.5px solid #dbe5e3;
      border-radius: 0.5rem;
      color: #DDBEA9;
      transition: background 200ms ease-in, color 200ms ease-in;

      &:hover{
        overflow: hidden;
        box-shadow: 0 2px 10px #c3ccca;
        border-radius: 0.5rem;
      }
  }

  .button-profile {
    padding: 0;
    font-family: Hanuman;
    font-weight: bold;
    font-size: 20px;
    background: transparent;
    border: 0;
    color: #DDBEA9;
    transition: background 200ms ease-in, color 200ms ease-in;

    &:hover{
      color: #ff9000;
      overflow: hidden;
    }
  }

  @media (max-width: 1220px) {
    flex-flow: column nowrap;
    position: fixed;
    transform: ${(props) => props.open ? 'translateX(0)' : 'translateX(100%)'};
    top: -16px;
    right: 0;
    height: 100%;
    width: 180px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    z-index: 9;
    justify-content: normal;
    background-color: rgba(244,255,253, 0.9);

    li {
      color: #000;
      margin-right: 34px;

      &:hover {
        color: #0DADEA;
      }

    .button-menu{
      {
        padding: 0.2rem;
        font-family: Hanuman;
        font-weight: bold;
        font-size: 15px;
        background: transparent;
        border: 0.5px solid #dbe5e3;
        border-radius: 0.5rem;
        color: #DDBEA9;
        transition: background 200ms ease-in, color 200ms ease-in;
  
        &:hover{
          overflow: hidden;
          box-shadow: 0 2px 10px #c3ccca;
          border-radius: 0.5rem;
        }
      }
    }

    .button-profile {
      padding: 0;
      font-family: Hanuman;
      font-weight: bold;
      font-size: 20px;
      background: transparent;
      border: 0;
      color: #DDBEA9;
      transition: background 200ms ease-in, color 200ms ease-in;

      &:hover{
        color: #ff9000;
        overflow: hidden;
      }
    }
  }
`

export const Logo = styled.img`
  margin-left: 25px;
  height: 180px;
  object-fit: contain;
  cursor: pointer;

  @media (max-width: 1250px) {
    margin: 20px 50px 20px 5%;
  }

`
export const LogoUl = styled.img`
  margin: 20px 50px 20px 5%;
  display: none;

  @media (max-width: 1220px) {
    display: flex;
    width: 160px;
    height: 100px;
    object-fit: contain;
  }
`
export const Icon = styled.div`
  width: 100vw;
  height: calc(100vh - 112px);
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 150px;
    height: 150px;
    pointer-events: none;
    object-fit: contain;

    @media (prefers-reduced-motion: no-preference) {
      animation: App-logo-spin infinite 20s linear;
    }
  }

    @keyframes App-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
  }
`
//font-family: 'basic title font';
//font-family: 'Zilla Slab';