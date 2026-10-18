import React from 'react';
import styled from 'styled-components';
import QuizLogo from '../QuizLogo';

const HeaderWrapper = styled.header`
  width: 100%;
  max-width: 948px;
  display: flex;
  flex-direction: column;
  align-items: ${({ $alignLogo }) => ($alignLogo === 'left' ? 'flex-start' : 'center')};
  gap: 12px;
  margin-bottom: 16px;

  & > svg {
    margin: ${({ $alignLogo }) => ($alignLogo === 'left' ? '0' : 'auto')};
  }
`;

const HeaderTitle = styled.div`
  width: 100%;
  max-width: ${({ $titleWidth }) => $titleWidth || 'none'};
  padding: 18px 24px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.primary};
  text-align: center;

  h1 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.2;
  }
`;

export default function Header({ title, alignLogo = 'center', titleWidth }) {
  return (
    <HeaderWrapper $alignLogo={alignLogo}>
      <QuizLogo />
      {title && (
        <HeaderTitle $titleWidth={titleWidth}>
          <h1>{title}</h1>
        </HeaderTitle>
      )}
    </HeaderWrapper>
  );
}





