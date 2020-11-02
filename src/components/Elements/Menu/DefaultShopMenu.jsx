import React from 'react';
import {Menu} from 'antd';
import DefaultCardButton from '@/components/Elements/Buttons/DefaultCardButton';
import DefaultProfilButton from '@/components/Elements/Buttons/DefaultProfilButton';

export default function DefaultShopMenu({appState}) {
  return (
    <React.Fragment>
      <Menu id="topShopMenu" theme="dark" mode="horizontal">
        <Menu.Item key={0}>
          <DefaultCardButton appState={appState} />
        </Menu.Item>
        <Menu.Item key={1}>
          <DefaultProfilButton appState={appState} />
        </Menu.Item>
      </Menu>
    </React.Fragment>
  );
}
