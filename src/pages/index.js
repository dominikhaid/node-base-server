import React from 'react';
import Link from 'next/link';

export default function Index({appState}) {
  return (
    <React.Fragment>
      <div id="kitList">
        <ul>
          <li>
            <Link href="/">
              <a>home</a>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <a>login</a>
            </Link>
          </li>
          <li>
            <Link href="/profil">
              <a>profil</a>
            </Link>
          </li>{' '}
          <li>
            <Link href="/register">
              <a>register</a>
            </Link>
          </li>
          <li>
            <Link href="/products">
              <a>products</a>
            </Link>
          </li>
          <li>
            <Link href="/card">
              <a>card</a>
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}
