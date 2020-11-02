import {
  LockOutlined,
  MailOutlined,
  PushpinOutlined,
  UserOutlined,
  HomeOutlined,
  FlagOutlined,
} from '@ant-design/icons';
import {Form, Select} from 'antd';
import DefaultInput from '@/components/Elements/Inputs/DefaultInput';
const {Option} = Select;

const FormFieldsUser = props => {
  const data = [
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

  return data.map(field => {
    return <DefaultInput {...field} />;
  });
};

const FormFieldsContact = props => {
  const data = [
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

  return data.map(field => {
    return <DefaultInput {...field} />;
  });
};

const FormFieldsAddress = props => {
  const data = [
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
  return data.map(field => {
    return <DefaultInput {...field} />;
  });
};

const InitialValues = props => {
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

export {FormFieldsUser, FormFieldsContact, FormFieldsAddress, InitialValues};
