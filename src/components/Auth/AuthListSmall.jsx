import React from 'react';
import {blue, red, grey} from '@ant-design/colors';

import {List, Divider} from 'antd';

import {
  GoogleSquareFilled,
  GithubOutlined,
  FacebookFilled,
} from '@ant-design/icons';

export default function AuthProvider() {
  const itemStyle = {
    fontSize: '4rem',
    textAlign: 'center',
    borderRadius: '999px',
    marginBottom: '0.2rem',
    marginTop: '0.2rem',
    width: '3rem',
    height: '3rem',
    boxShadow:
      '2px 2px 5px rgba(40,40,40,0.2),-2px -2px 5px rgba(220,220,220,0.2)',
    padding: '0.2rem 0.5rem 0.5rem 0.5rem',
    overflow: 'hidden',
  };

  const listStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  const dividerStyle = {
    maxWidth: '350px',
    margin: 'auto',
  };

  const items = [
    {
      title: 'Google',
      icon: () => {
        return <GoogleSquareFilled />;
      },
      link: '/',
      style: {
        color: red[6],
        position: 'relative',
        top: '-1.85rem',
        left: '-1rem',
      },
      onClick: e => {
        e.preventDefault();
        alert(e.target);
      },
    },
    {
      title: 'Github',
      icon: () => {
        return <GithubOutlined />;
      },
      link: '/',
      style: {
        color: grey[6],
        position: 'relative',
        top: '-1.85rem',
        left: '-1rem',
      },
      onClick: e => {
        e.preventDefault();
        alert(e.target);
      },
    },
    {
      title: 'Facebook',
      icon: () => {
        return <FacebookFilled />;
      },
      link: '/',
      style: {
        color: blue[6],
        position: 'relative',
        top: '-1.85rem',
        left: '-1.28rem',
      },
      onClick: e => {
        e.preventDefault();
        alert(e.target);
      },
    },
  ];

  return (
    <>
      <div style={dividerStyle}>
        <Divider className={'ant-primary'} plain>
          Sign in with
        </Divider>
      </div>
      <List
        style={listStyle}
        grid={{gutter: 25, column: 3}}
        dataSource={items}
        renderItem={item => (
          <List.Item style={itemStyle}>
            <a
              onClick={e => {
                item.onClick(e);
              }}
              style={item.style}
            >
              {item.icon()}
            </a>
          </List.Item>
        )}
      />
    </>
  );
}
