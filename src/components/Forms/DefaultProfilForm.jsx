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
        defaultValue:
          props.user && props.user.userName ? props.user.userName : '',
        prefix: <UserOutlined />,
        placeholder: 'User Name',
      },
    },
    {
      fromItem: {
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

  const formFieldsContact = [
    {
      formItem: {
        name: 'firstname',
        rules: [{required: true, message: 'Please input your first name!'}],
      },
      input: {
        prefix: <UserOutlined />,
        placeholder: 'First Name',
        defaultValue:
          props.user && props.user.contactFirstName
            ? props.user.contactFirstName
            : '',
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
        defaultValue:
          props.user && props.user.contactLastName
            ? props.user.contactLastName
            : '',
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
        defaultValue: props.user && props.user.email ? props.user.email : '',
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
        defaultValue: props.user && props.user.phone ? props.user.phone : '',
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
        defaultValue:
          props.user && props.user.addressLine1 ? props.user.addressLine1 : '',
      },
    },
    {
      formItem: {},
      input: {
        prefix: <PushpinOutlined />,
        placeholder: 'Address',
        defaultValue:
          props.user && props.user.addressLine2 ? props.user.addressLine2 : '',
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
        defaultValue: props.user && props.user.city ? props.user.city : '',
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
        defaultValue: props.user && props.user.state ? props.user.state : '',
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
        defaultValue:
          props.user && props.user.postalCode ? props.user.postalCode : '',
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
        defaultValue:
          props.user && props.user.country ? props.user.country : '',
      },
    },
  ];

  //STYLES
  const layout = {
    labelCol: {span: 0},
    wrapperCol: {span: 24},
  };

  const tailLayout = {
    wrapperCol: {offset: 0, span: 20},
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
        name="basic"
        initialValues={{remember: true}}
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
          console.log(field);
          return <DefaultInput {...field} />;
        })}
        <Divider className={'ant-primary'} plain></Divider>
        <Collapse accordion>
          <Panel header="Contact Info" key="1">
            {formFieldsContact.map(field => {
              return <DefaultInput {...field} />;
            })}
          </Panel>
          <Panel header="Address Info" key="2">
            {formFieldsAddress.map(field => {
              return <DefaultInput {...field} />;
            })}
          </Panel>
        </Collapse>
        <Divider className={'ant-primary'} plain></Divider>
        <Form.Item
          {...tailLayout}
          style={{marginTop: '1rem'}}
          name="remember"
          valuePropName="checked"
        >
          <Space size={'large'}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button type="secondary" htmlType="submit">
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}
