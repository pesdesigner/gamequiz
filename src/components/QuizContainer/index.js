import styled from 'styled-components';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 420px;
  flex: 0 1 420px;
  padding-top: 0;
  margin: 0;

  @media screen and (max-width: 700px) {
    max-width: 420px;
    padding-top: 0;
    margin: auto;
  }
`;

export default QuizContainer;

