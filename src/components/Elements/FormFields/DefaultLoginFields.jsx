import {LockOutlined, MailOutlined} from '@ant-design/icons';
import DefaultInput from '@/components/Elements/Inputs/DefaultInput';

const FormFields = props => {
  const data = [
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

  return data.map(field => {
    return <DefaultInput {...field} />;
  });
};
const InitialValues = props => {
  return {
    userName: props.user && props.user.email ? props.user.email : '',
    login: false,
    password: props.user && props.user.password ? props.user.password : '',
  };
};

export {FormFields, InitialValues};
