// import React from 'react';
import {UserOutlined} from '@ant-design/icons';
import {Avatar} from 'antd';

export default function DefaultAvatar(props) {
  //STYLE
  const avatarStyle = {
    style: {
      maxWidth: props.style && props.style.size ? props.style.size : '300px',
      maxHeight: props.style && props.style.size ? props.style.size : '300px',
      minWidth: props.style && props.style.size ? props.style.size : '300px',
      minHeight: props.style && props.style.size ? props.style.size : '300px',
      margin: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
    },
  };
  return (
    <Avatar
      style={props.style ? props.style.style : avatarStyle.style}
      src={props.src}
      shape="round"
      size={138}
      icon={<UserOutlined />}
    />
  );
}
