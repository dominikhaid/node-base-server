// import React from 'react';
import BorderedH3 from '@/components/Elements/Titles/BorderedH3';
import {Space, Spin, Form, Row, Col, Button, Checkbox} from 'antd';
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
      },
    },
  ];

  const initialValues = {
    username: props.user && props.user.userName ? props.user.userName : '',
    login: false,
    password: props.user && props.user.password ? props.user.password : '',
  };
  const layout = {
    wrapperCol: {span: 24, offset: 5},
  };

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const loading = true;
  return (
    <>
      <Spin tip="Login..." spinning={loading} delay={500}>
        <BorderedH3 title={'Login'} />
        <Form
          scrollToFirstError={true}
          {...layout}
          name="login"
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <DefaultInput {...formFields[0]} />
          <DefaultInput {...formFields[1]} />
          <Row>
            <Col span={24} offset={0}>
              <Form.Item name="login" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Col>
            <Col span={24} offset={5}>
              <Space size={'large'}>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
                <Button type="secondary" htmlType="submit">
                  Register
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
        <AuthProvider />
      </Spin>
    </>
  );
}