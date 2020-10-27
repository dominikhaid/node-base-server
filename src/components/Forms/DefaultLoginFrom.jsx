import React, {useState} from 'react';
import BorderedH3 from '@/components/Elements/Titles/BorderedH3';
import {Space, message, Spin, Form, Row, Col, Button, Checkbox} from 'antd';
import AuthProvider from '@/components/Auth/AuthListSmall';
import DefaultInput from '@/components/Elements/Inputs/DefaultInput';
import {useRouter} from 'next/router';

import {LockOutlined, UserOutlined} from '@ant-design/icons';

export default function LoginForm(props) {
  if (!process.browser) return <></>;

  const [loading, setLoading] = useState(true);

  const formFields = [
    {
      formItem: {
        name: 'userName',
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
    userName: props.user && props.user.userName ? props.user.userName : '',
    login: false,
    password: props.user && props.user.password ? props.user.password : '',
  };

  const layout = {
    wrapperCol: {span: 24, offset: 5},
  };

  const router = useRouter();

  const errorMsg = () => {
    message.error({
      content: 'from could not be validated.',
      className: 'ant-messages',
      style: {
        marginTop: '20vh',
      },
    });
  };

  async function loginAndValidate(email, path) {
    async function getUser(email) {
      let url = `http://localhost/api/customers/search/${email}`;
      const data = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      })
        .then(data => {
          return data.json();
        })
        .catch(error => {
          return error;
        });
      return data;
    }

    let data = await getUser(email, path);

    const updateContext = user => {
      props.updateState({user: user});
      if (path) router.push(path);
      return false;
    };

    if (data.success) updateContext(data.success);
    return false;
  }

  async function onFinish(values) {
    console.log('Success:', values);
    //login with username and password return tokken
    loginAndValidate('example@exaple.de', '/profil');
  }

  const onFinishFailed = errorInfo => {
    errorMsg();
    // console.log('Failed:', errorInfo);
  };

  if (process.browser && loading)
    setLoading(!loginAndValidate('example@exapl.de', '/profil'));

  if (loading) return <p>Loading</p>;
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
