import React from 'react';
import Link from 'next/link';
import {Menu} from 'antd';

export default function DefaultTopBar(props) {
  return (
    <React.Fragment>
      <nav id="topNav">
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">
            <Link href="/">
              <a>home</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/login">
              <a>login</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link href="/profil">
              <a>profil</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link href="/register">
              <a>register</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link href="/products">
              <a>products</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link href="/card">
              <a>card</a>
            </Link>
          </Menu.Item>
        </Menu>
      </nav>
    </React.Fragment>
  );
}
