import {Form, Input} from 'antd';
import styled from 'styled-components';

export default function DefaultInput(props) {
  if (!props) return <></>;

  const StyledFormItem = styled(Form.Item)`
    width: 100%;
  `;

  const InputType = () => {
    return props.input.type === 'password' ? (
      <Input.Password {...props.input} />
    ) : (
      <Input {...props.input} />
    );
  };

  return props.formItem ? (
    <StyledFormItem {...props.formItem}>{InputType()}</StyledFormItem>
  ) : (
    InputType()
  );
}
