import React, {useState} from 'react';

import DefaultInput from '@/components/Elements/Inputs/DefaultInput';
import BorderedH3 from '@/components/Elements/Titles/BorderedH3';
import DefaultDragger from '@/components/Elements/Uploads/DefaultDragger';
import {useRouter} from 'next/router';
import {
  errorMsg,
  loadingMsg,
  succesMsg,
  message,
} from '@/components/Elements/Messages/DefaultMessages';
import {Space, Form, Divider, Select, Button} from 'antd';
import {
  LockOutlined,
  MailOutlined,
  PushpinOutlined,
  UserOutlined,
  HomeOutlined,
  FlagOutlined,
} from '@ant-design/icons';

export default function ProfilForm(props) {
  const [tmpUser, setTmpUser] = useState(
    props.user
      ? props.user
      : {
          customerNumber: false,
          email: false,
          password: false,
          userName: false,
          customerPhoto: false,
          contactLastName: false,
          contactFirstName: false,
          phone: false,
          addressLine1: false,
          addressLine2: false,
          city: false,
          state: false,
          postalCode: false,
          country: false,
        },
  );
  const [form] = Form.useForm();
  const router = useRouter();
  const {Option} = Select;

  const formFieldsUser = [
    {
      formItem: {
        name: 'userName',
        rules: [{required: true, message: 'Please input your userName!'}],
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
          {required: true, message: 'Please input your password!'},
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
    {
      formItem: {
        name: 'password_repeat',
        dependencies: ['password'],
        rules: [
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({getFieldValue}) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                'The two passwords that you entered do not match!',
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

  const formFieldsContact = [
    {
      formItem: {
        name: 'contactFirstName',
        rules: [{required: true, message: 'Please input your first name!'}],
      },
      input: {
        prefix: <UserOutlined />,
        placeholder: 'First Name',
      },
    },
    {
      formItem: {
        name: 'contactLastName',
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
        dependencies: ['prefix_phone'],
        rules: [
          {
            required: true,
            message: 'Please input your phone number!',
          },
          ({getFieldValue}) => ({
            validator(rule, value) {
              return /(\+\d{1})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s-.]?\d{4}/gm.test(
                getFieldValue('prefix_phone') + value,
              )
                ? Promise.resolve()
                : Promise.reject('The phone number is not valid!');
            },
          }),
        ],
      },
      input: {
        addonBefore: (
          <Form.Item name="prefix_phone" noStyle>
            <Select style={{width: 70}}>
              <Option value="+43">+43</Option>
              <Option value="+41">+41</Option>
              <Option value="+49">+49</Option>
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
        name: 'addressLine1',
        rules: [{required: true, message: 'Please input your adress!'}],
      },
      input: {
        prefix: <PushpinOutlined />,
        placeholder: 'Address',
      },
    },
    {
      formItem: {name: 'addressLine2'},
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
        name: 'postalCode',
        rules: [{required: true, message: 'Please input your zip code!'}],
      },
      input: {
        prefix: <HomeOutlined />,
        placeholder: 'postalCode',
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

  const initialValues = () => {
    return {
      userName: props.user && props.user.userName ? props.user.userName : '',
      password: props.user && props.user.password ? props.user.password : '',
      password_repeat:
        props.user && props.user.password_repeat
          ? props.user.password_repeat
          : '',
      contactFirstName:
        props.user && props.user.contactFirstName
          ? props.user.contactFirstName
          : '',
      contactLastName:
        props.user && props.user.contactLastName
          ? props.user.contactLastName
          : '',
      email: props.user && props.user.email ? props.user.email : '',
      phone: props.user && props.user.phone ? props.user.phone : '',
      addressLine1:
        props.user && props.user.addressLine1 ? props.user.addressLine1 : '',
      addressLine2:
        props.user && props.user.addressLine2 ? props.user.addressLine2 : '',
      city: props.user && props.user.city ? props.user.city : '',
      state: props.user && props.user.state ? props.user.state : '',
      postalCode:
        props.user && props.user.postalCode ? props.user.postalCode : '',
      country: props.user && props.user.country ? props.user.country : '',
      prefix_phone: '+49',
    };
  };

  async function registerUser(newUser, path) {
    async function createUser(newUser) {
      let url = `http://localhost/api/customers/${newUser.email}`;
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
        body: new URLSearchParams(newUser),
      })
        .then(data => {
          return data.json();
        })
        .catch(error => {
          return error;
        });
      return data;
    }

    let data = await createUser(newUser, path);
    message.destroy();
    const updateContext = user => {
      succesMsg('Registration successfull!');
      props.updateState({user: user});
      if (path) router.push(path);
    };
    console.log(data);

    if (data.success) updateContext(data.success);
    if (data.error)
      errorMsg(
        data.error.msg.errors
          ? data.error.msg.errors[0].message
          : data.error.msg,
      );
    return false;
  }

  const onFinish = values => {
    if (values.phone && !new RegExp(/^\+\d\d/).test(values.phone))
      values.phone = values.prefix_phone + values.phone;

    delete values.prefix_phone;
    let dataImg = values.customerPhotoData;
    delete values.customerPhotoData;
    loadingMsg('Sending Data!');
    registerUser(values, '/');
  };

  const onFinishFailed = errorInfo => {
    errorMsg('From could not be validated!');
  };

  return (
    <>
      <Form
        form={form}
        user={tmpUser && tmpUser.customerNumber ? tmpUser.customerNumber : null}
        labelCol={{span: 0}}
        wrapperCol={{span: 24}}
        scrollToFirstError={true}
        name="register"
        initialValues={initialValues()}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <BorderedH3 title={'Register'} />
        <DefaultDragger
          user={tmpUser}
          form={form}
          style={{size: '250px'}}
          upload={{
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            multiple: false,
            showUploadList: true,
            name: 'files',
            accept: '.jpg,.png',
          }}
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
          <Button
            type="secondary"
            onClick={() => {
              form.setFieldsValue(initialValues());
            }}
          >
            Reset
          </Button>
          {props.cancel ? (
            <Button
              type="secondary"
              onClick={() => {
                props.cancel();
              }}
            >
              Cancel
            </Button>
          ) : (
            ''
          )}
        </Space>
      </Form>
    </>
  );
}
