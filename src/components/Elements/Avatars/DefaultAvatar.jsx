// import React from 'react';
import {UserOutlined} from '@ant-design/icons';
import {Avatar, Row, Col} from 'antd';

export default function DefaultAvatar(props) {
  return (
    <Row>
      <Col
        span={props.span ? props.span : 24}
        offset={props.offset ? props.offset : 6}
      >
        <Avatar
          src={props.src}
          shape="round"
          size={138}
          icon={<UserOutlined />}
        />
      </Col>
    </Row>
  );
}
