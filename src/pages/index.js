import React from 'react';

export default function Index(props) {
  if (!process.browser) {
    //console.debug('Home SERVER');
  } else {
    console.debug('Home CLIENT', props);
  }

  return (
    <React.Fragment>
      <div id="kitList">
      <p>HELLO NEXT.js</p>
      </div>
    </React.Fragment>
  );
}
