import React from 'react';
import DefaultShoppingList from '@/components/Lists/DefaultShoppingList';

export default function Card(props) {
  if (!process.browser) {
    //console.debug('Home SERVER');
  } else {
    // console.debug('Card', props);
  }

  const mainCon = {
    maxWidth: '900px',
    // display: 'flex',
    // justifyContent: 'center',
    // flexWrap: 'wrap',
    margin: 'auto',
    marginTop: '3rem',
    boxShadow:
      '2px 2px 5px rgba(40,40,40,0.2),-2px -2px 5px rgba(220,220,220,0.2)',
    padding: '2rem',
  };

  return (
    <React.Fragment>
      <div style={mainCon}>
        <DefaultShoppingList {...props} updateCard={props.updateCard} />
      </div>
    </React.Fragment>
  );
}

export async function getStaticProps(context) {
  let url = 'http://localhost/api/products';
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });

  let data = await response.json(); // parses JSON response into native JavaScript objects

  return {
    props: {
      products: data.success ? data.success : false,
      // productLine: 'Bikes',
    },
  };
}
