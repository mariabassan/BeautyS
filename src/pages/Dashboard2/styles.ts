import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #fff1e3;
`;

export const HeaderContent = styled.div`
  button {
    margin-left: auto;
    background: none;
    border: none;

    svg {
      color: #696765;
    }
  }
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
  margin-left: 150px;
  margin-right: 150px;
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

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: #999591;
  }
`;