/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Lottie } from '@crello/react-lottie';
// import db from '../../../db.json';
import Widget from '../../components/Widget';
import Header from '../../components/Header';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArrow';
import Link from '../../components/Link';
import Footer from '../../components/Footer';

import loadingAnimation from '../animations/loading.json';

const QuizPageLayout = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px 16px 112px;

  @media screen and (max-width: 700px) {
    min-height: 100vh;
    gap: 0;
    padding: 8px 16px 112px;
  }
`;

const QuizFooter = styled(Footer)`
  position: fixed;
  z-index: 30;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  width: min(calc(100vw - 32px), 980px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);

  @media screen and (max-width: 500px) {
    padding: 12px;

    img {
      width: 42px;
      margin-right: 12px;
    }

    p {
      margin: 0;
      font-size: 12px;
    }
  }
`;
const QuizLayout = styled.div`
  width: min(100%, 948px);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;

  @media screen and (max-width: 700px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding-top: 8px;
  }
`;

const HomeLink = styled(Link)`
  display: block;
  margin-top: 24px;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.contrastText};
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: opacity 0.3s;

  &:hover,
  &:focus {
    opacity: 0.75;
  }
`;
const QuizImagePanel = styled.aside`
  flex: 1;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);

  img {
    display: block;
    width: 100%;
    max-height: 380px;
    object-fit: contain;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
  }

  h3, p {
    margin: 0;
  }

  h3 {
    color: ${({ theme }) => theme.colors.contrastText};
    font-size: 20px;
  }

  p {
    color: rgba(255, 255, 255, 0.82);
    line-height: 1.5;
  }

  strong {
    color: ${({ theme }) => theme.colors.contrastText};
  }

  @media screen and (max-width: 700px) {
    order: -1;
    width: 100%;
    max-width: 350px;

    img {
      max-height: 180px;
    }
  }
`;

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Seu desempenho:
      </Widget.Header>

      <Widget.Content>
        <p>
          Muito bom! Acertou 
          {' '}
          {/* {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)} */}
          {results.filter((x) => x).length}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${index}`}>
              #
              {index + 1}
              {' '}
              Resultado:
              {result === true
                ? ' Acertou'
                : ' Errou'}
            </li>
          ))}
        </ul>
        <p>Acho que entregou a idade ;) </p>
        <HomeLink href="/">Voltar à tela inicial</HomeLink>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content style={{ display: 'flex', justifyContent: 'center' }}>
        <Lottie
          width="200px"
          height="200px"
          className="lottie-container basic"
          config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
        />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  gameTitle,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <Widget.Content>
        {gameTitle && <h1>{gameTitle}</h1>}
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `question__${questionIndex}__alternative__${alternativeIndex}`;
            const isSelected = selectedAlternative === alternativeIndex;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';

            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  checked={isSelected}
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage({ externalQuestions, externalBg, externalTitle }) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const totalQuestions = externalQuestions.length;
  const bg = externalBg;

  function addResult(result) {
    // results.push(result);
    setResults([
      ...results,
      result,
    ]);
  }

  // [React chama de: Efeitos || Effects]
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 2000);
  // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizPageLayout>
        <Header alignLogo="left" />
        <QuizLayout>
          <QuizContainer>
          {screenState === screenStates.QUIZ && (
            <QuestionWidget
              question={question}
              gameTitle={externalTitle}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
              onSubmit={handleSubmitQuiz}
              addResult={addResult}
            />
          )}

          {screenState === screenStates.LOADING && <LoadingWidget />}

          {screenState === screenStates.RESULT && <ResultWidget results={results} />}
        </QuizContainer>
        {screenState === screenStates.QUIZ && question?.image && (
          <QuizImagePanel>
            <img src={question.image} alt="Imagem da pergunta" />
            {question.imageDescription && (
              <div>
                <h3>{question.imageDescription.title}</h3>
                <p><strong>Plataformas:</strong> {question.imageDescription.platforms.join(', ')}</p>
                <p><strong>Ano:</strong> {question.imageDescription.year}</p>
                <p><strong>Marca:</strong> {question.imageDescription.brand}</p>
                <p>{question.imageDescription.description}</p>
              </div>
            )}
          </QuizImagePanel>
        )}
        </QuizLayout>
        <QuizFooter />
      </QuizPageLayout>
    </QuizBackground>
  );
}

















