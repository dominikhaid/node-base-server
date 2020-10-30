import React from 'react';
import {useRouter} from 'next/router';
import ProfilForm from '../components/Forms/DefaultProfilForm';

export default function Profil({appState}) {
  if (!process.browser) return <></>;

  const router = useRouter();
  if (process.browser && !appState.user) router.push('/login');

  return (
    <React.Fragment>
      <ProfilForm user={appState.user} updateState={appState.updateState} />
    </React.Fragment>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
// export async function getStaticProps(context) {
//   let url = 'http://localhost/api/customers/search/example@exaple.de';
//   const response = await fetch(url, {
//     method: 'GET', // *GET, POST, PUT, DELETE, etc.
//     mode: 'no-cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json',
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow',
//     referrerPolicy: 'no-referrer',
//   });

//   let data = await response.json(); // parses JSON response into native JavaScript objects

//   return {
//     props: {
//       user: data.success ? data.success : false,
//       // productLine: 'Bikes',
//     },
//   };
// }
