import React from 'react';
import LoginForm from '@/components/Forms/DefaultLoginFrom';
import styled from 'styled-components';
export default function Login({appState}) {
  const StyledLoginForm = styled.section`
    max-width: 500px;
    margin: auto;
    margin-top: 3rem;
    box-shadow: 2px 2px 5px rgba(40, 40, 40, 0.2),
      -2px -2px 5px rgba(220, 220, 220, 0.2);
    padding: 2rem;
  `;

  return (
    <React.Fragment>
      <StyledLoginForm>
        <LoginForm user={appState.user} updateState={appState.updateState} />
      </StyledLoginForm>
    </React.Fragment>
  );
}
