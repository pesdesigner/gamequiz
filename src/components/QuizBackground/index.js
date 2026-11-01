import styled from 'styled-components';

const QuizBackground = styled.div`
  width: 100%;
  flex: 1;
  background-color: #000;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.68), rgba(0, 0, 0, 0.82)),
    url(${({ backgroundImage }) => backgroundImage});
  background-size: cover;
  background-position: center;

  @media screen and (max-width: 500px) {
    background-image: none;

    &:after {
      content: "";
      background-image:
        linear-gradient(rgba(0, 0, 0, 0.35), #000),
        url(${({ backgroundImage }) => backgroundImage});
      background-size: cover;
      background-position: center;
      display: block;
      width: 100%;
      height: 210px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }

    *:first-child {
      position: relative;
      z-index: 10;
    }
  }
`;

export default QuizBackground;
