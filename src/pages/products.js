import React from 'react';
import Link from 'next/link';
import {Typography} from 'antd';

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';

export default function Card(props) {
  if (!process.browser) {
    //console.debug('Home SERVER');
  } else {
    //console.debug('Home CLIENT', props);
  }

  return (
    <React.Fragment>
      <h1>Card</h1>
    </React.Fragment>
  );
}
