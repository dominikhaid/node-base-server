import {List} from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

export default function DefaultVerticalLinkList(props) {
  if (!props) return <></>;

  const StyledVerticalList = styled(List)`
    width: 100%;
    maxwidth: 500px;
    margin: auto;
    color: white;
    text-align: center;
  `;

  const data = [
    {
      title: 'Home',
      link: '/',
    },
    {
      title: 'Products',
      link: '/products',
    },
    {
      title: 'Login',
      link: '/login',
    },
    {
      title: 'Card',
      link: '/card',
    },
  ];
  return (
    <StyledVerticalList
      grid={{gutter: 16, column: 4}}
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta title={<Link href={item.link}>{item.title}</Link>} />
        </List.Item>
      )}
    />
  );
}
