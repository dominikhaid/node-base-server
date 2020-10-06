import React from 'react';
import {blue, red, grey} from '@ant-design/colors';

import {List, Divider} from 'antd';

import {
  GoogleSquareFilled,
  GithubOutlined,
  FacebookFilled,
} from '@ant-design/icons';

export default function AuthProvider() {
  const authList = {
    fontSize: '1.5rem',
    textAlign: 'center',
    border: `1px ${grey[1]} solid`,
    borderRadius: '999px',
    marginBottom: '0.2rem',
    marginTop: '0.2rem',
    width: '3rem',
    height: '3rem',
    boxShadow: '2px 2px 5px rgba(40,40,40,0.2)',
    padding: '0.2rem 0.5rem 0.5rem 0.5rem',
  };

  const data = [
    {
      title: 'Google',
      icon: () => {
        return <GoogleSquareFilled />;
      },
      link: '/',
      style: {color: red[6]},
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
      style: {color: grey[6]},
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
      style: {color: blue[6]},
      onClick: e => {
        e.preventDefault();
        alert(e.target);
      },
    },
  ];

  const authCon = {
    // backgroundColor: 'gray',
    maxWidth: '400px',
    margin: 'auto',
  };

  const dividerStyle = {
    // backgroundColor: 'gray',
    maxWidth: '300px',
    margin: 'auto',
  };

  return (
    <>
      <div style={dividerStyle}>
        <Divider className={'ant-primary'} plain>
          Sign in with
        </Divider>
      </div>
      <List
        style={authCon}
        grid={{gutter: 16, column: 3}}
        dataSource={data}
        renderItem={item => (
          <List.Item style={authList}>
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
