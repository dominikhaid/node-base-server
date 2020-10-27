import {Popconfirm, message, InputNumber} from 'antd';
import {ShoppingCartOutlined, DeleteOutlined} from '@ant-design/icons';
import React, {useState} from 'react';

export default function CardActions(props) {
  if (process.browser) {
    console.log('Card ACTIONS', props);
  }

  const [popup, setPopup] = useState({
    visible: false,
  });

  const [cardItem, setCardItem] = useState(
    props.card.products[findProduct(props.item.productCode)],
  );

  const inputStyle = {
    marginLeft: '0.5rem',
    maxWidth: '65px',
  };
  const deleteStyle = {
    style: {
      color: 'red',
      fontSize: '1.5rem',
      maxWidth: '1.5rem',
      verticalAlign: 'middle',
    },
  };

  const addStyle = {
    style: {
      fontSize: '1.5rem',
      maxWidth: '1.5rem',
      verticalAlign: 'middle',
    },
  };

  function findProduct(item) {
    if (!props.card.products || props.card.products.length < 1) return false;
    return props.card.products.findIndex(e => {
      return e.productCode === item;
    });
  }

  if (!cardItem)
    return [
      <>
        <ShoppingCartOutlined key="addCard" {...addStyle} />
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
            message.success('Product added to card');
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
          <InputNumber
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
            style={inputStyle}
            min={1}
            max={props.quantityInStock}
            defaultValue={1}
          />
        </Popconfirm>
      </>,
    ];

  return (
    <>
      <DeleteOutlined key="removeCard" {...deleteStyle} />
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
          message.success('Product removed');
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
        <InputNumber
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
          style={inputStyle}
          min={0}
          max={cardItem.quantityInStock}
          defaultValue={cardItem.quantity}
        />
      </Popconfirm>
    </>
  );
}
