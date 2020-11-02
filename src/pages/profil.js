import React from 'react';
import {useRouter} from 'next/router';
import ProfilForm from '../components/Forms/DefaultProfilForm';
import styled from 'styled-components';

export default function Profil({appState}) {
  if (!process.browser) return <></>;

  const router = useRouter();
  if (process.browser && !appState.user) router.push('/login');
  const StyledProfilForm = styled.section`
    max-width: 500px;
    margin: auto;
    margin-top: 3rem;
    box-shadow: 2px 2px 5px rgba(40, 40, 40, 0.2),
      -2px -2px 5px rgba(220, 220, 220, 0.2);
    padding: 2rem;
  `;

  return (
    <React.Fragment>
      <StyledProfilForm>
        <ProfilForm user={appState.user} updateState={appState.updateState} />
      </StyledProfilForm>
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
