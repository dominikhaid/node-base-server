import React, {useState} from 'react';
import {Drawer} from 'antd';
import DefaultShoppingList from '@/components/Lists/DefaultShoppingList';
import styled from 'styled-components';
import {ShoppingCartOutlined} from '@ant-design/icons';

export default function DefaultCardButton({appState}) {
  const StyledDrawer = styled(Drawer)`
    .ant-drawer-content-wrapper {
      max-width: max-content;
    }
    form {
      width: 450px;
      margin: auto;
    }
  `;

  const data = [
    {
      title: 'Card',
      link: '/card',
    },
  ];

  const [visible, setVisible] = useState(false);

  return (
    <>
      {data.map((item, index) => {
        if (appState.user.customerPhoto)
          return (
            <ShoppingCartOutlined
              href={item.link}
              onClick={e => {
                e.preventDefault();
                setVisible(true);
              }}
            >
              {item.title}
            </ShoppingCartOutlined>
          );

        return (
          <ShoppingCartOutlined
            href={item.link}
            onClick={e => {
              e.preventDefault();
              setVisible(true);
            }}
          >
            {item.title}
          </ShoppingCartOutlined>
        );
      })}
      <StyledDrawer
        width={640}
        placement="right"
        closable={false}
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
      >
        <DefaultShoppingList {...appState} updateCard={appState.updateCard} />
      </StyledDrawer>
    </>
  );
}
