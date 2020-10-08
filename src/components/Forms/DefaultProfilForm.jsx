// import React from 'react';

import DefaultInput from '@/components/Elements/Inputs/DefaultInput';
import BorderedH3 from '@/components/Elements/Titles/BorderedH3';
import DefaultAvatar from '@/components/Elements/Avatars/DefaultAvatar';

import {Space, Form, Divider, Collapse, Select, Button} from 'antd';
const {Panel} = Collapse;
const {Option} = Select;

import {
  LockOutlined,
  MailOutlined,
  PushpinOutlined,
  UserOutlined,
  HomeOutlined,
  FlagOutlined,
} from '@ant-design/icons';

export default function ProfilForm(props) {
  const formFieldsUser = [
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

  const formFieldsContact = [
    {
      formItem: {
        name: 'firstname',
        rules: [{required: true, message: 'Please input your first name!'}],
      },
      input: {
        prefix: <UserOutlined />,
        placeholder: 'First Name',
      },
    },
    {
      formItem: {
        name: 'lastname',
        rules: [{required: true, message: 'Please input your family name!'}],
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
        rules: [{required: true, message: 'Please input your phone number!'}],
      },
      input: {
        addonBefore: (
          <Form.Item name="prefix" noStyle>
            <Select defaultValue="49" style={{width: 70}}>
              <Option value="43">+43</Option>
              <Option value="41">+41</Option>
              <Option value="49">+49</Option>
            </Select>
          </Form.Item>
        ),
        style: {width: '100%'},
        placeholder: 'Phone',
      },
    },
  ];

  const formFieldsAddress = [
    {
      formItem: {
        name: 'adress1',
        rules: [{required: true, message: 'Please input your adress!'}],
      },
      input: {
        prefix: <PushpinOutlined />,
        placeholder: 'Address',
      },
    },
    {
      formItem: {name: 'adress2'},
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
        rules: [{required: true, message: 'Please input your zip code!'}],
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
    labelCol: {span: 0},
    wrapperCol: {span: 24},
  };

  //HANDLER
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <BorderedH3 title={'Profil'} />
      <Form
        user={
          props.user && props.user.customerNumber
            ? props.user.customerNumber
            : null
        }
        {...layout}
        scrollToFirstError={true}
        name="profil"
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <DefaultAvatar
          src={
            props.user && props.user.customerPhoto
              ? props.user.customerPhoto
              : null
          }
        />
        <Divider className={'ant-primary'} plain></Divider>
        {formFieldsUser.map(field => {
          return <DefaultInput {...field} />;
        })}
        <Divider className={'ant-primary'} plain>
          Contact Info
        </Divider>

        {formFieldsContact.map(field => {
          return <DefaultInput {...field} />;
        })}
        <Divider className={'ant-primary'} plain>
          Address Info
        </Divider>
        {formFieldsAddress.map(field => {
          return <DefaultInput {...field} />;
        })}

        <Divider className={'ant-primary'} plain></Divider>

        <Space size={'large'}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button type="secondary" htmlType="submit">
            Reset
          </Button>
        </Space>
      </Form>
    </>
  );
}
