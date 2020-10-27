import React from 'react';
import Link from 'next/link';
import LoginForm from '@/components/Forms/DefaultLoginFrom';

export default function Login(props) {
  if (!process.browser) {
    //console.debug('Home SERVER');
  } else {
    //console.debug('Home CLIENT', props);
  }

  const mainCon = {
    maxWidth: '900px',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: 'auto',
    marginTop: '3rem',
    boxShadow:
      '2px 2px 5px rgba(40,40,40,0.2),-2px -2px 5px rgba(220,220,220,0.2)',
    padding: '2rem',
  };

  return (
    <React.Fragment>
      <div style={mainCon}>
        <LoginForm user={props.user} updateState={props.updateState} />
      </div>
    </React.Fragment>
  );
}
