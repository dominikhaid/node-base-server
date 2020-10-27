import {List, Popconfirm, message, InputNumber} from 'antd';
import {ShoppingCartOutlined, DeleteOutlined} from '@ant-design/icons';
import React, {useState} from 'react';

export default function DefaultImgItem(props) {
  if (process.browser) {
    // console.log('Card INNER', props);
  }

  const CardActions = item => {
    const [popup, setPopup] = useState({
      visible: false,
    });

    function addDelete(index, item) {
      // console.log('ITEMS', item);

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
      if (index !== -1)
        return (
          <>
            <DeleteOutlined key="removeCard" {...deleteStyle} />
            <Popconfirm
              {...popup}
              onConfirm={() => {
                let productInd = findProduct({
                  productCode: item.productCode,
                });
                if (productInd === -1) return;
                let uptProducts = JSON.parse(
                  JSON.stringify(props.card.products[productInd]),
                );
                uptProducts.quantity = Number(0);
                props.updateCard([uptProducts]);
                setPopup({
                  visible: false,
                });
                message.success('Product removed');
              }}
              onCancel={() => {
                let productInd = findProduct({
                  productCode: item.productCode,
                });
                if (productInd === -1) return;
                let uptProducts = JSON.parse(
                  JSON.stringify(props.card.products[productInd]),
                );
                uptProducts.quantity = Number(1);
                props.updateCard([uptProducts]);
                setPopup({
                  visible: false,
                });
              }}
              okText="Yes"
              cancelText="No"
            >
              <InputNumber
                step={1}
                id={item.productCode + '-qaunt'}
                onChange={e => {
                  if (e === 0) {
                    setPopup({
                      title: 'Remove product from card ?',
                      visible: true,
                    });
                    return;
                  }
                  let productInd = findProduct({
                    productCode: item.productCode,
                  });
                  if (productInd === -1) return;
                  let uptProducts = JSON.parse(
                    JSON.stringify(props.card.products[productInd]),
                  );
                  uptProducts.quantity = Number(e);
                  props.updateCard([uptProducts]);
                }}
                parser={value => Math.round(value)}
                style={inputStyle}
                min={0}
                max={item.quantityInStock}
                defaultValue={item.quantity}
              />
            </Popconfirm>
          </>
        );

      return [
        <>
          <ShoppingCartOutlined
            onClick={e => changeQuantity(e)}
            key="addCard"
            {...addStyle}
          />
          <InputNumber
            step={1}
            parser={value => Math.round(value)}
            style={inputStyle}
            min={1}
            max={props.quantityInStock}
            defaultValue={1}
          />
        </>,
      ];
    }

    function findProduct(item) {
      return props.card.products.findIndex(e => {
        return e.productCode === item.productCode;
      });
    }

    return [addDelete(findProduct(item), item)];
  };

  const listData = [];

  const shoppingCardItem = {
    style: {
      width: '100%',
    },
  };

  const listTitle = {
    style: {
      width: '100%',
      color: '#1890ff',
      fontWeight: 'bold',
    },
  };

  const shoppingCardItemImg = {
    style: {
      width: '100%',
      maxWidth: '250px',
    },
  };

  if (props.card.products && props.card.products.length !== 0)
    props.card.products.forEach(e => {
      listData.push({
        title: e.productName,
        content: e.productDescription,
        description: e.productLine,
        quantityInStock: e.quantityInStock,
        quantity: e.quantity,
        productCode: e.productCode,
        img: e.productPhotos.split(',')[0],
      });
    });

  const DefaultItemFooter = props => {
    return (
      <div>
        <b>E-Commerce Demo</b>{' '}
        <a taget="_blank" href="https://www.dominikhaid.de">
          www.dominikhaid.de
        </a>
        &nbsp;&copy; Dominik Haid
      </div>
    );
  };

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={
        listData.length > 10
          ? {
              onChange: page => {
                console.log(page);
              },
              pageSize: 3,
            }
          : false
      }
      dataSource={listData}
      footer={DefaultItemFooter()}
      renderItem={item => (
        <List.Item
          {...shoppingCardItem}
          key={item.productCode}
          id={item.productCode}
          // actions={CardActions(item)}
          extra={
            <img
              width="100%"
              {...shoppingCardItemImg}
              alt={item.title}
              src={item.img}
            />
          }
        >
          <List.Item.Meta
            title={
              <a {...listTitle} href={item.href}>
                {item.title}
              </a>
            }
            description={item.description}
          />
          {item.content}
          <div style={{marginTop: '1rem'}}>
            <CardActions {...item} />
          </div>
        </List.Item>
      )}
    />
  );
}
