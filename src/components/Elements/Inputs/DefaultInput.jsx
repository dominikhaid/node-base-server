import styled from 'styled-components';
import {Form, Input} from 'antd';

export default function DefaultInput(props) {
  if (!props) return <></>;

  const StyledInput = styled(Input)`
    width: 100%;
    max-width: 350px;
  `;

  const StyledInputPassword = styled(Input)`
    width: 100%;
    max-width: 350px;
  `;

  const InputType = () => {
    return props.input.type === 'password' ? (
      <StyledInputPassword {...props.input} />
    ) : (
      <StyledInput {...props.input} />
    );
  };

  return props.formItem ? (
    <Form.Item {...props.formItem}>{InputType()}</Form.Item>
  ) : (
    InputType()
  );
}
