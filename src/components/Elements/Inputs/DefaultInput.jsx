// import React from 'react';
import {Form, Input} from 'antd';

export default function DefaultInput(props) {
  if (!process.browser) {
    //console.debug('Home SERVER');
  } else {
    // console.debug('Home CLIENT', props);
  }

  if (!props) return <></>;

  const inputStyle = {
    style: {
      width: '100%',
      maxWidth: '350px',
    },
  };
  const InputType = () => {
    return props.input.type === 'password' ? (
      <Input.Password {...inputStyle} {...props.input} />
    ) : (
      <Input {...props.input} {...inputStyle} />
    );
  };

  return props.formItem ? (
    <Form.Item {...props.formItem}>{InputType()}</Form.Item>
  ) : (
    InputType()
  );
}
