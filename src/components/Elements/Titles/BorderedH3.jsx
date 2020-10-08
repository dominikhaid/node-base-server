// import React from 'react';
import {Typography} from 'antd';
const {Title} = Typography;
import {grey} from '@ant-design/colors';

export default function BorderedH3(props) {
  const titleStyle = {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    marginBottom: '3rem',
    color: grey[1],
    borderBottom: `1px solid ${grey[1]}`,
  };

  return (
    <Title level={3} style={titleStyle}>
      {props.title}
    </Title>
  );
}
