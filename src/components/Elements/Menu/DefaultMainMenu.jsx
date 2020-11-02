import React from 'react';
import Link from 'next/link';
import {Menu} from 'antd';

export default function DefaultMainMenu(props) {
  const data = [
    {
      title: 'Home',
      link: '/',
    },
    {
      title: 'Products',
      link: '/products',
    },
  ];

  return (
    <React.Fragment>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        {data.map((item, index) => {
          return (
            <Menu.Item key={index}>
              <Link href={item.link}>{item.title}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </React.Fragment>
  );
}
