import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background-color: rgba(244,255,253, 0.9);
`;

export const HeaderContent = styled.div`
  display: flex;
  align-itens: center;
  justify-content:space-around; 
  padding: 0px 40px; 
`;

export const logo = styled.div`
 img {
    height: 170px;
  }
`;

export const ButtonOff = styled.div`

button {
  background: none;
  border: none;

  svg {
    color: #696765;
  }
}
`;

export const DivEmpty = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  margin-right: 50px;
`;

export const HeaderProfile = styled.div`
  display: flex;
  align-items: center;
  
  
  img {
    width: 85px;
    height: 85px;
    border-radius: 20%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #696765;
      font-size: 18px;
    }

    a {
      text-decoration: none;
      color: #ff9000;

      transition: opacity 0.3s;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Section = styled.section`
  margin-top: 48px;

`;