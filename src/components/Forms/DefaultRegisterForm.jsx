import React, { useState } from 'react';

import DefaultInput from '@/components/Elements/Inputs/DefaultInput';
import BorderedH3 from '@/components/Elements/Titles/BorderedH3';
import DefaultDragger from '@/components/Elements/Uploads/DefaultDragger';

import {
  Space,
  message,
  Spin,
  Form,
  Divider,
  Collapse,
  Select,
  Button,
} from 'antd';
const { Panel } = Collapse;
const { Option } = Select;

import {
  LockOutlined,
  MailOutlined,
  PushpinOutlined,
  UserOutlined,
  HomeOutlined,
  FlagOutlined,
} from '@ant-design/icons';

export default function ProfilForm(props) {
  //STATE
  const [loading, setLoading] = useState(false);
  const formFieldsUser = [
    {
      formItem: {
        name: 'username',
        rules: [{ required: true, message: 'Please input your username!' }],
      },
      input: {
        prefix: <UserOutlined />,
        placeholder: 'User Name',
      },
    },
    {
      formItem: {
        name: 'password',
        rules: [{ required: true, message: 'Please input your password!' }],
      },
      input: {
        type: 'password',
        prefix: <LockOutlined />,
        placeholder: 'Password',
      },
    },
    {
      formItem: {
        name: 'password_repeat',
        dependencies: ['password'],
        rules: [
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                'The two passwords that you entered do not match!'
              );
            },
          }),
        ],
      },
      input: {
        type: 'password',
        prefix: <LockOutlined />,
        placeholder: 'Confirm Password',
      },
    },
  ];
  //DATA
  const formFieldsContact = [
    {
      formItem: {
        name: 'firstname',
        rules: [{ required: true, message: 'Please input your first name!' }],
      },
      input: {
        prefix: <UserOutlined />,
        placeholder: 'First Name',
      },
    },
    {
      formItem: {
        name: 'lastname',
        rules: [{ required: true, message: 'Please input your family name!' }],
      },
      input: {
        prefix: <UserOutlined />,
        placeholder: 'Last Name',
      },
    },
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
        name: 'phone',
        label: 'Phone Number',
        rules: [{ required: true, message: 'Please input your phone number!' }],
      },
      input: {
        addonBefore: (
          <Form.Item name='prefix' noStyle>
            <Select defaultValue='49' style={{ width: 70 }}>
              <Option value='43'>+43</Option>
              <Option value='41'>+41</Option>
              <Option value='49'>+49</Option>
            </Select>
          </Form.Item>
        ),
        style: { width: '100%' },
        placeholder: 'Phone',
      },
    },
  ];

  const formFieldsAddress = [
    {
      formItem: {
        name: 'adress1',
        rules: [{ required: true, message: 'Please input your adress!' }],
      },
      input: {
        prefix: <PushpinOutlined />,
        placeholder: 'Address',
      },
    },
    {
      formItem: { name: 'adress2' },
      input: {
        prefix: <PushpinOutlined />,
        placeholder: 'Address',
      },
    },
    {
      formItem: {
        name: 'city',
        rules: [
          {
            required: true,
            message: 'Please input the city you live in!',
          },
        ],
      },
      input: {
        prefix: <HomeOutlined />,
        placeholder: 'City',
      },
    },
    {
      formItem: {
        name: 'state',
        rules: [
          {
            required: true,
            message: 'Please input the state you live in!',
          },
        ],
      },
      input: {
        prefix: <HomeOutlined />,
        placeholder: 'State',
      },
    },
    {
      formItem: {
        name: 'postalcode',
        rules: [{ required: true, message: 'Please input your zip code!' }],
      },
      input: {
        prefix: <HomeOutlined />,
        placeholder: 'Postalcode',
      },
    },
    {
      formItem: {
        name: 'country',
        rules: [
          {
            required: true,
            message: 'Please input your the country you live in!',
          },
        ],
      },
      input: {
        prefix: <FlagOutlined />,
        placeholder: 'Country',
      },
    },
  ];

  const initialValues = {
    username: props.user && props.user.userName ? props.user.userName : '',
    password: props.user && props.user.password ? props.user.password : '',
    password_repeat:
      props.user && props.user.password_repeat
        ? props.user.password_repeat
        : '',
    firstname:
      props.user && props.user.contactFirstName
        ? props.user.contactFirstName
        : '',
    lastname:
      props.user && props.user.contactLastName
        ? props.user.contactLastName
        : '',
    email: props.user && props.user.email ? props.user.email : '',
    phone: props.user && props.user.phone ? props.user.phone : '',
    adress1:
      props.user && props.user.addressLine1 ? props.user.addressLine1 : '',
    adress2:
      props.user && props.user.addressLine2 ? props.user.addressLine2 : '',
    city: props.user && props.user.city ? props.user.city : '',
    state: props.user && props.user.state ? props.user.state : '',
    postalcode:
      props.user && props.user.postalCode ? props.user.postalCode : '',
    country: props.user && props.user.country ? props.user.country : '',
  };
  //STYLES
  const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };

  //HANDLER
  const errorMsg = () => {
    message.error({
      content: 'from could not be validated.',
      className: 'ant-messages',
      style: {
        marginTop: '20vh',
      },
    });
  };
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
    errorMsg();
  };

  return (
    <>
      <Spin tip='Saving...' spinning={loading} delay={500}>
        <BorderedH3 title={'Register'} />
        <Form
          user={
            props.user && props.user.customerNumber
              ? props.user.customerNumber
              : null
          }
          {...layout}
          scrollToFirstError={true}
          name='register'
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <DefaultDragger
            user={props.user}
            style={{ size: '250px' }}
            upload={{
              action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
              multiple: false,
              showUploadList: false,
              name: 'files',
              accept: '.jpg,.png',
            }}
          />

          <Divider className={'ant-primary'} plain></Divider>
          {formFieldsUser.map((field) => {
            return <DefaultInput {...field} />;
          })}
          <Divider className={'ant-primary'} plain>
            Contact Info
          </Divider>
          {formFieldsContact.map((field) => {
            return <DefaultInput {...field} />;
          })}
          <Divider className={'ant-primary'} plain>
            Address Info
          </Divider>
          {formFieldsAddress.map((field) => {
            return <DefaultInput {...field} />;
          })}
          <Divider className={'ant-primary'} plain></Divider>
          <Space size={'large'}>
            <Button type='primary' htmlType='submit'>
              Save
            </Button>
            <Button type='secondary' htmlType='submit'>
              Cancel
            </Button>
          </Space>
        </Form>
      </Spin>
    </>
  );
}