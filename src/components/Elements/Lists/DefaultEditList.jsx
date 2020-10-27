import {List} from 'antd';
import React from 'react';
import DeafultCardActions from '@/components/Elements/Cards/DeafultCardActions';

export default function DefaultImgItem(props) {
  if (process.browser) {
    console.log('Card INNER', props);
  }

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
            <DeafultCardActions
              card={props.card}
              updateCard={props.updateCard}
              item={item}
            />
          </div>
        </List.Item>
      )}
    />
  );
}
