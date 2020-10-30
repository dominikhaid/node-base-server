import React from 'react';
import DefaultShoppingList from '@/components/Lists/DefaultShoppingList';

export default function Card({appState}) {
  return (
    <React.Fragment>
      <DefaultShoppingList {...appState} updateCard={appState.updateCard} />
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
