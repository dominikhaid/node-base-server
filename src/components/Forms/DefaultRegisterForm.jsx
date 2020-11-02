import React, {useState} from 'react';
import BorderedH3 from '@/components/Elements/Titles/BorderedH3';
import DefaultDragger from '@/components/Elements/Uploads/DefaultDragger';
import {useRouter} from 'next/router';
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
import {Space, Form, Divider, Select, Button} from 'antd';

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
    if (values.new_email) {
      values.email = values.new_email;
    }
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
        initialValues={InitialValues(props)}
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
        <Space size={'large'}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button
            type="secondary"
            onClick={() => {
              form.setFieldsValue(InitialValues(props));
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
