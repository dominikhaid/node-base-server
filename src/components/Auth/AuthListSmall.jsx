import React from 'react';
import {blue, red, grey} from '@ant-design/colors';
import {List, Divider} from 'antd';
import styled from 'styled-components';
import {
  GoogleSquareFilled,
  GithubOutlined,
  FacebookFilled,
} from '@ant-design/icons';

export default function AuthProvider() {
  const data = [
    {
      title: 'Google',
      icon: () => {
        return <GoogleSquareFilled />;
      },
      link: '/',
      style: {
        color: red[6],
        position: 'relative',
        top: '-1.65rem',
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

  const StyledAuthItem = styled(List.Item)`
    font-size: 4rem;
    text-align: center;
    border-radius: 50%;
    margin-bottom: 0.2rem;
    margin-top: 0.2rem;
    width: 3rem;
    height: 3rem;
    box-shadow: 2px 2px 5px rgba(40, 40, 40, 0.2),
      -2px -2px 5px rgba(220, 220, 220, 0.2);
    padding: 0.2rem 0.5rem 0.5rem 0.5rem;
    overflow: hidden;
    transition-property: width, height, font-size, box-shadow;
    transition-duration: 0.2s;
    &:hover {
      font-size: 4.1rem;
      width: 3.1rem;
      height: 3.1rem;
      box-shadow: rgba(40, 40, 40, 1) 2px 2px 5px,
        rgba(220, 220, 220, 0.2) -2px -2px 5px;
      padding: 0.3rem 0.5rem 0.5rem;
    }
  `;

  const StyledList = styled(List)`
    display: flex;
    justify-content: center;
  `;

  const StyledDivider = styled.div`
    max-width: 350px;
    margin: auto;
  `;

  return (
    <>
      <StyledDivider>
        <Divider className={'ant-primary'} plain>
          Sign in with
        </Divider>
      </StyledDivider>
      <StyledList
        id="authButtons"
        grid={{gutter: 25, column: 3}}
        dataSource={data}
        renderItem={data => (
          <StyledAuthItem>
            <a
              onClick={e => {
                data.onClick(e);
              }}
              style={datastyle}
            >
              {data.icon()}
            </a>
          </StyledAuthItem>
        )}
      />
    </>
  );
}
