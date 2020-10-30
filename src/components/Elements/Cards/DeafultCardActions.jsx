import {Popconfirm, message, InputNumber} from 'antd';
import {ShoppingCartOutlined, DeleteOutlined} from '@ant-design/icons';
import React, {useState} from 'react';
import styled from 'styled-components';
export default function CardActions(props) {
  const [popup, setPopup] = useState({
    visible: false,
  });

  const [cardItem, setCardItem] = useState(
    props.card.products[findProduct(props.item.productCode)],
  );

  const StyledDeleteItemButton = styled(DeleteOutlined)`
    color: red;
    fontsize: 1.5rem;
    maxwidth: 1.5rem;
    verticalalign: middle;
  `;

  const StyledAddItemButton = styled(ShoppingCartOutlined)`
    fontsize: 1.5rem;
    maxwidth: 1.5rem;
    verticalalign: middle;
  `;

  const StyledInputNumber = styled(InputNumber)`
    margin-left: 0.5rem;
    max-width: 65px;
  `;

  function findProduct(item) {
    if (!props.card.products || props.card.products.length < 1) return false;
    return props.card.products.findIndex(e => {
      return e.productCode === item;
    });
  }

  if (!cardItem)
    return [
      <>
        <StyledAddItemButton key="addCard" />
        <Popconfirm
          {...popup}
          onConfirm={() => {
            let uptProducts = JSON.parse(JSON.stringify(props.item));
            uptProducts.quantity = Number(
              document.getElementById(props.item.productCode + '-qaunt').value,
            );
            setCardItem(uptProducts);
            props.updateCard([uptProducts]);
            setPopup({
              visible: false,
              locked: false,
            });
            message.success({content: 'Product added to card'});
          }}
          onCancel={() => {
            setPopup({
              visible: false,
              locked: false,
            });
          }}
          okText="Yes"
          cancelText="No"
        >
          <StyledInputNumber
            id={props.item.productCode + '-qaunt'}
            step={1}
            onChange={e => {
              if (popup.locked) {
                setTimeout(() => {
                  setPopup({
                    visible: false,
                    locked: false,
                  });
                }, 400);
                return;
              }
              setTimeout(() => {
                setPopup({
                  title: `Add ${e}x to card?`,
                  visible: true,
                  locked: true,
                });
              }, 400);
            }}
            parser={value => Math.round(value)}
            min={1}
            max={props.quantityInStock}
            defaultValue={1}
          />
        </Popconfirm>
      </>,
    ];

  return (
    <>
      <StyledDeleteItemButton key="removeCard" />
      <Popconfirm
        {...popup}
        onConfirm={() => {
          let uptProducts = JSON.parse(JSON.stringify(cardItem));
          uptProducts.quantity = Number(0);
          props.updateCard([uptProducts]);
          setCardItem(false);
          setPopup({
            visible: false,
          });
          message.success({content: 'Product removed'});
        }}
        onCancel={() => {
          let uptProducts = JSON.parse(JSON.stringify(cardItem));
          uptProducts.quantity = Number(1);
          props.updateCard([uptProducts]);
          setCardItem(uptProducts);
          setPopup({
            visible: false,
          });
        }}
        okText="Yes"
        cancelText="No"
      >
        <StyledInputNumber
          step={1}
          id={cardItem.productCode + '-qaunt'}
          onChange={e => {
            if (e === 0) {
              setPopup({
                title: 'Remove product from card ?',
                visible: true,
              });
              return;
            }
            let uptProducts = JSON.parse(JSON.stringify(cardItem));
            uptProducts.quantity = Number(e);
            setCardItem(uptProducts);
            props.updateCard([uptProducts]);
          }}
          value={cardItem.quantity}
          parser={value => Math.round(value)}
          min={0}
          max={cardItem.quantityInStock}
          defaultValue={cardItem.quantity}
        />
      </Popconfirm>
    </>
  );
}
