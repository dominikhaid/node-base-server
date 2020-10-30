import React from 'react';
import LoginForm from '@/components/Forms/DefaultLoginFrom';

export default function Login({appState}) {
  return (
    <React.Fragment>
      <LoginForm user={appState.user} updateState={appState.updateState} />
    </React.Fragment>
  );
}
