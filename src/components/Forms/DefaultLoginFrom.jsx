// import React from 'react';
import BorderedH3 from '@/components/Elements/Titles/BorderedH3';
import {Space, Form, Input, Button, Checkbox} from 'antd';
import AuthProvider from '@/components/Auth/AuthListSmall';
import DefaultInput from '@/components/Elements/Inputs/DefaultInput';

import {LockOutlined, UserOutlined} from '@ant-design/icons';

export default function LoginForm(props) {
  const formFields = [
    {
      formItem: {
        name: 'username',
        rules: [{required: true, message: 'Please input your username!'}],
      },
      input: {
        defaultValue:
          props.user && props.user.userName ? props.user.userName : '',
        prefix: <UserOutlined />,
        placeholder: 'User Name',
      },
    },
    {
      formItem: {
        name: 'password',
        rules: [{required: true, message: 'Please input your password!'}],
      },
      input: {
        type: 'password',
        prefix: <LockOutlined />,
        placeholder: 'Password',
        defaultValue:
          props.user && props.user.password ? props.user.password : '',
      },
    },
  ];

  const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 24, offset: 5},
  };

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <BorderedH3 title={'Login'} />
      <Form
        {...layout}
        name="basic"
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <DefaultInput {...formFields[0]} />
        <DefaultInput {...formFields[1]} />

        <Form.Item name="remember" valuePropName="checked">
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
      <AuthProvider />
    </>
  );
}
