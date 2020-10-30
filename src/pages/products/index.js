import React from 'react';
// import Link from 'next/link';
import DefaultCardList from '@/components/Lists/DefaultCardList';
import {useRouter} from 'next/router';
export default function Products({appState}) {
  const router = useRouter();

  if (
    (process.browser && !appState.products) ||
    (process.browser && appState.products.length < 1)
  )
    router.push('/505');

  return (
    <React.Fragment>
      <DefaultCardList {...appState} />
    </React.Fragment>
  );
}
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
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

//SSR ONLY
// Products.getInitialProps = async ctx => {
//   const res = await fetch('http://localhost/api/products');
//   const posts = await res.json();
//   return {
//     props: {
//       products: posts,
//       // productLine: 'Bikes',
//     },
//   };
// };
