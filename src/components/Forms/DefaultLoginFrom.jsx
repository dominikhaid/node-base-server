import React from 'react';
import {blue, red, grey} from '@ant-design/colors';

import {Typography, Space, Form, Input, Button, Checkbox} from 'antd';

const {Title} = Typography;

export default function LoginForm() {
  const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
  };
  const tailLayout = {
    wrapperCol: {offset: 4, span: 20},
  };

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const loginStyle = {
    maxWidth: '600px',
    margin: 'auto',
  };

  const titleStyle = {
    paddingBottom: '1rem',
    marginBottom: '3rem',
    borderBottom: `2px solid ${blue[4]}`,
  };

  return (
    <>
      <Title className={'ant-primary'} style={titleStyle}>
        Login
      </Title>
      <Form
        style={loginStyle}
        {...layout}
        name="basic"
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{required: true, message: 'Please input your username!'}]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{required: true, message: 'Please input your password!'}]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Space size={'large'}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button type="secondary" htmlType="submit">
              Register
            </Button>
            <Checkbox>Remember me</Checkbox>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}
