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
        <LoginForm user={props.user} />
      </div>
    </React.Fragment>
  );
}
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  // const res = await fetch('https://.../posts');
  // const posts = await res.json();

  return {
    props: {
      user: {
        customerNumber: 103,
        email: 'example@exaple.de',
        password: 'dom53361.',
        userName: 'Carine  Schmitt',
        customerPhoto:
          'https://www.dominikhaid.de/wordpress/wp-content/uploads/2020/04/dom-1zu1-sw-mid-768x785.jpg',
        contactLastName: 'Schmitt',
        contactFirstName: 'Carine ',
        phone: '40.32.2555',
        addressLine1: '54, rue Royale',
        addressLine2: '',
        city: 'Nantes',
        state: '',
        postalCode: 44000,
        country: 'France',
        salesRepEmployeeNumber: 1370,
        creditLimit: 21000,
        createdAt: '2020-10-06 23:51:01.216 +00:00',
        updatedAt: '2020-10-06 23:51:01.216 +00:00',
      },
    },
  };
}
