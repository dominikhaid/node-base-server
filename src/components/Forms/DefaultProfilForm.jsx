import React from 'react';
import BorderedH3 from '@/components/Elements/Titles/BorderedH3';
import DefaultAvatar from '@/components/Elements/Avatars/DefaultAvatar';
import {
  errorMsg,
  loadingMsg,
  succesMsg,
  message,
} from '@/components/Elements/Messages/DefaultMessages';
import {
  FormFieldsUser,
  FormFieldsContact,
  FormFieldsAddress,
  InitialValues,
} from '@/components/Elements/FormFields/DefaultProfilFields';
import {useRouter} from 'next/router';
import {Space, Form, Divider, Button} from 'antd';

export default function ProfilForm(props) {
  const router = useRouter();
  const [form] = Form.useForm();

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
    if (values.phone && !new RegExp(/^\+\d\d/).test(values.phone))
      values.phone = values.prefix_phone + values.phone;
    delete values.prefix_phone;
    let dataImg = values.customerPhotoData;
    delete values.customerPhotoData;
    loadingMsg('Updating profil!');
    updateUser(values);
  };

  const onFinishFailed = errorInfo => {
    errorMsg({content: 'Something went wrong!'});
  };

  return (
    <>
      <Form
        user={
          props.user && props.user.customerNumber
            ? props.user.customerNumber
            : null
        }
        form={form}
        labelCol={{span: 0}}
        wrapperCol={{span: 24}}
        scrollToFirstError={true}
        name="profil"
        initialValues={InitialValues(props)}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <BorderedH3
          title={
            props.user &&
            props.user.contactFirstName &&
            props.user.contactLastName
              ? `Profil of ${props.user.contactFirstName} ${props.user.contactLastName}`
              : 'Profil'
          }
        />
        <DefaultAvatar
          src={
            props.user && props.user.customerPhoto
              ? props.user.customerPhoto
              : null
          }
        />
        <Space style={{marginTop: '1rem'}} size={'large'}>
          <Button
            type="primary"
            onClick={() => {
              succesMsg('Logged out!');
              props.updateState({user: false});
            }}
          >
            Logout
          </Button>
          <Button type="secondary" htmlType="submit">
            Save
          </Button>
          <Button
            type="secondary"
            onClick={() => {
              console.log(props.user);
              form.setFieldsValue(InitialValues(props));
            }}
          >
            Reset
          </Button>
        </Space>

        <Divider className={'ant-primary'} plain></Divider>
        <FormFieldsUser />
        <Divider className={'ant-primary'} plain>
          Contact Info
        </Divider>
        <FormFieldsContact />
        <Divider className={'ant-primary'} plain>
          Address Info
        </Divider>
        <FormFieldsAddress />
        <Divider className={'ant-primary'} plain></Divider>
      </Form>
    </>
  );
}
