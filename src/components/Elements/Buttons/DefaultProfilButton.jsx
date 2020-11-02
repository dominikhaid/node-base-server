import React, {useState} from 'react';
import {Drawer} from 'antd';
import DefaultProfilForm from '@/components/Forms/DefaultProfilForm';
import LoginForm from '@/components/Forms/DefaultLoginFrom';
import {UserOutlined} from '@ant-design/icons';
import styled from 'styled-components';

export default function DefaultProfilButton({appState}) {
  const StyledDrawer = styled(Drawer)`
    .ant-drawer-content-wrapper {
      max-width: max-content;
    }
    form {
      width: 450px;
      margin: auto;
    }
    form#login {
      width: 100;
      margin: auto;
    }
    form#login .ant-form-item-control-input {
      max-width: 280px;
    }
  `;

  const data = [
    {
      title: 'Profil',
      link: '/profil',
    },
  ];

  const [visible, setVisible] = useState(false);

  return (
    <>
      {data.map((item, index) => {
        return (
          <UserOutlined
            href={item.link}
            onClick={e => {
              e.preventDefault();
              setVisible(true);
            }}
          >
            {item.title}
          </UserOutlined>
        );
      })}
      <StyledDrawer
        width={640}
        placement="right"
        closable={false}
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
      >
        {appState.user ? (
          <DefaultProfilForm
            user={appState.user}
            updateState={appState.updateState}
          />
        ) : (
          <LoginForm user={appState.user} updateState={appState.updateState} />
        )}
      </StyledDrawer>
    </>
  );
}
