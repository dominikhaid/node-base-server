import React from 'react';
// import Link from 'next/link';
import DefaultCardList from '@/components/Lists/DefaultCardList';

export default function BikeId(props) {
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
        <DefaultCardList {...props} />
      </div>
    </React.Fragment>
  );
}
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps(context) {
  let url = `http://localhost/api/products/${context.params.productCode}`;
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });

  let data = await response.json();

  return {
    props: {
      products: data.success ? [data.success] : false,
    },
  };
}

export async function getStaticPaths() {
  let url = 'http://localhost/api/products';
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });

  const data = await response.json();

  const paths = data.success
    ? data.success.map(el => ({
        params: {
          productCode: el.productCode,
        },
      }))
    : [];

  return {
    paths,
    fallback: false,
  };
}
