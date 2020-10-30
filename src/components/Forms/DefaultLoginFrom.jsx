import React, {useState} from 'react';
import BorderedH3 from '@/components/Elements/Titles/BorderedH3';
import {Space, message, Form, Row, Col, Button, Checkbox} from 'antd';
import AuthProvider from '@/components/Auth/AuthListSmall';
import DefaultInput from '@/components/Elements/Inputs/DefaultInput';
import {useRouter} from 'next/router';
import styled from 'styled-components';

import {LockOutlined, MailOutlined} from '@ant-design/icons';

export default function LoginForm(props) {
  if (!process.browser) return <></>;

  const [loading, setLoading] = useState(true);

  const formFields = [
    {
      formItem: {
        name: 'email',
        rules: [
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ],
      },
      input: {
        prefix: <MailOutlined />,
        placeholder: 'E-Mail',
      },
    },
    {
      formItem: {
        name: 'password',
        rules: [
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            pattern: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
            message:
              'Password must contain 1 uppercase 1 lowercase and 1 number and the length must be between 8-16 characters',
          },
        ],
      },
      input: {
        type: 'password',
        prefix: <LockOutlined />,
        placeholder: 'Password',
      },
    },
  ];

  const initialValues = {
    userName: props.user && props.user.email ? props.user.email : '',
    login: false,
    password: props.user && props.user.password ? props.user.password : '',
  };

  const StyledLoginForm = styled(Form)`
    max-width: 500px;
    margin: auto;
    margin-top: 3rem;
    box-shadow: 2px 2px 5px rgba(40, 40, 40, 0.2),
      -2px -2px 5px rgba(220, 220, 220, 0.2);
    padding: 2rem;
  `;

  const router = useRouter();

  const errorMsg = msg => {
    message.error({
      content: msg ? msg : 'From could not be validated!',
    });
  };

  const loadingMsg = msg => {
    message.loading({
      content: msg ? msg : 'Sending Data!',
    });
  };

  const succesMsg = msg => {
    message.success({
      content: msg ? msg : 'Sending Data!',
    });
  };

  async function loginAndValidate(values, path) {
    async function getUser(values) {
      let url = `http://localhost/api/customers/login/plain`;
      const data = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          // 'Content-Type': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: new URLSearchParams(values),
      })
        .then(data => {
          return data.json();
        })
        .catch(error => {
          return error;
        });
      return data;
    }

    let data = await getUser(values, path);

    const updateContext = user => {
      succesMsg('Successfully logged in!');
      props.updateState({user: user});
      if (path) router.push(path);
    };
    message.destroy();
    if (data.success) updateContext(data.success);
    if (data.error) errorMsg(data.error.msg);
    return false;
  }

  async function onFinish(values) {
    loadingMsg('Verifying login!');
    loginAndValidate(values, '/profil');
  }

  const onFinishFailed = errorInfo => {
    errorMsg('Form could not be submitted');
  };

  if (process.browser && loading)
    setLoading(!loginAndValidate(props.user ? props.user : false, '/profil'));

  if (loading) return <p>Loading</p>;
  return (
    <>
      <StyledLoginForm
        scrollToFirstError={true}
        wrapperCol={{span: 24, offset: 5}}
        name="login"
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <BorderedH3 title={'Login'} />
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
        <AuthProvider />
      </StyledLoginForm>
    </>
  );
}
