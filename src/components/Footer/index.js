import styled from 'styled-components';
import packageInfo from '../../../package.json';

const FooterWrapper = styled.footer`
  background-color: #00000070;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  border-radius: 4px;

  img {
    width: 58px;
    margin-right: 20px;
  }

  a {
    color: white;
    text-decoration: none;
    transition: opacity 0.3s;

    &:hover,
    &:focus {
      opacity: 0.75;
    }

    span {
      text-decoration: underline;
    }
  }
`;

const FooterCredits = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    margin: 0;
    line-height: 1.35;
  }

  small {
    font-size: 12px;
    opacity: 0.75;
  }
`;

export default function Footer(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FooterWrapper {...props}>
      <a href="https://pesdesigner.github.io/pes.portfolio/">
        <img src="https://avatars.githubusercontent.com/u/28512542" alt="Logo Grafico e Web" />
      </a>
      <FooterCredits>
        <p>
          Desenvolvido por{' '}
          <a href="https://pesdesigner.github.io/pes.portfolio/">
            <span>pesdesigner</span>
          </a>
        </p>
        <p>
          Orgulhosamente criado durante a{' '}
          <a href="https://www.alura.com.br/">
            <span>Imersão React da Alura</span>
          </a>
        </p>
        <small>v{packageInfo.version}</small>
      </FooterCredits>
    </FooterWrapper>
  );
}
