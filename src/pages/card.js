import React from 'react';
import DefaultShoppingList from '@/components/Lists/DefaultShoppingList';

export default function Card(props) {
  if (!process.browser) {
    //console.debug('Home SERVER');
  } else {
    //console.debug('Home CLIENT', props);
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
        <DefaultShoppingList {...props} />
      </div>
    </React.Fragment>
  );
}
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
// export async function getStaticProps() {
//   // const res = await fetch('https://.../posts');
//   // const posts = await res.json();

//   return {
//     props: {
//       // products: products,
//     },
//   };
// }
