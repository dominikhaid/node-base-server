import {Typography} from 'antd';
const {Title} = Typography;
import {grey} from '@ant-design/colors';
import styled from 'styled-components';

export default function BorderedH3(props) {
  const StyledH3 = styled(Title)`
    &.ant-typography,
    &h3 {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      margin-bottom: 3rem;
      color: ${grey[1]};
      border-bottom: 1px solid ${grey[1]};
    }
  `;

  return (
    <StyledH3 style={props.style} level={3}>
      {props.title}
    </StyledH3>
  );
}
