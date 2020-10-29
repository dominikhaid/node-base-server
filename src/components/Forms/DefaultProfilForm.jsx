import React, {useState} from 'react';

import DefaultInput from '@/components/Elements/Inputs/DefaultInput';
import BorderedH3 from '@/components/Elements/Titles/BorderedH3';
import DefaultAvatar from '@/components/Elements/Avatars/DefaultAvatar';
import {useRouter} from 'next/router';
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
  //STATE
  const [loading, setLoading] = useState(false);
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
  const router = useRouter();
  const [form] = Form.useForm();
  //DATA
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
        name: 'new_email',
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
        name: 'email',
        className: 'ant-hidden',
      },
      input: {
        hidden: true,
        disabled: true,
        className: 'ant-hidden',
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
        props.user && props.user.password ? props.user.password : '',
      contactFirstName:
        props.user && props.user.contactFirstName
          ? props.user.contactFirstName
          : '',
      contactLastName:
        props.user && props.user.contactLastName
          ? props.user.contactLastName
          : '',
      new_email: props.user && props.user.email ? props.user.email : '',
      email: props.user && props.user.email ? props.user.email : '',
      phone:
        props.user && props.user.phone
          ? props.user.phone.replace(/^\+\d\d/, '')
          : '',
      addressLine1:
        props.user && props.user.addressLine1 ? props.user.addressLine1 : '',
      addressLine2:
        props.user && props.user.addressLine2 ? props.user.addressLine2 : '',
      city: props.user && props.user.city ? props.user.city : '',
      state: props.user && props.user.state ? props.user.state : '',
      postalCode:
        props.user && props.user.postalCode ? props.user.postalCode : '',
      country: props.user && props.user.country ? props.user.country : '',
      prefix_phone:
        props.user && props.user.phone
          ? props.user.phone.replace(/(^\+\d\d)(.*)/, '$1')
          : '',
    };
  };

  const layout = {
    labelCol: {span: 0},
    wrapperCol: {span: 24},
  };

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

  async function updateUser(values, path) {
    async function callDb(values) {
      let url = `http://localhost/api/customers/${values.email}`;
      const data = await fetch(url, {
        method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
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

    let data = await callDb(values, path);

    message.destroy();
    const updateContext = user => {
      form.setFieldsValue({email: user.email});
      succesMsg('Profil updated successfuly!');
      props.updateState({user: user});
      if (path) router.push(path);
    };

    if (data.success) updateContext(data.success.result);
    if (data.error)
      errorMsg(
        data.error.msg.errors
          ? data.error.msg.errors[0].message
          : data.error.msg,
      );
    return false;
  }

  const onFinish = values => {
    delete values.password_repeat;
    if (!values.phone.test(/^\+\d\d/))
      values.phone = values.prefix_phone + values.phone;
    delete values.prefix_phone;
    let dataImg = values.customerPhotoData;
    delete values.customerPhotoData;
    loadingMsg('Updating profil!');
    updateUser(values);
  };

  const onFinishFailed = errorInfo => {
    // console.log('Failed:', errorInfo);
    errorMsg();
  };

  return (
    <>
      <Spin tip="Saving..." spinning={loading} delay={500}>
        <BorderedH3
          title={
            props.user &&
            props.user.contactFirstName &&
            props.user.contactLastName
              ? `Profil of ${props.user.contactFirstName} ${props.user.contactLastName}`
              : 'Profil'
          }
        />
        <Form
          user={
            props.user && props.user.customerNumber
              ? props.user.customerNumber
              : null
          }
          form={form}
          {...layout}
          scrollToFirstError={true}
          name="profil"
          initialValues={initialValues()}
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
            <Button
              type="secondary"
              onClick={() => {
                console.log(props.user);
                form.setFieldsValue(initialValues());
              }}
            >
              Reset
            </Button>
          </Space>
        </Form>
      </Spin>
    </>
  );
}
