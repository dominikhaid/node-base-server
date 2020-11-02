import {UserOutlined} from '@ant-design/icons';
import {Avatar} from 'antd';
import styled from 'styled-components';

export default function DefaultAvatar(props) {
  const StyledAvatar = styled(Avatar)`
    max-width: 300px;
    max-height: 300px;
    min-width: 150px;
    min-height: 150px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    border-radius: 50%;
  `;

  return (
    <StyledAvatar
      src={props.src}
      shape="round"
      size={138}
      icon={<UserOutlined />}
    />
  );
}
