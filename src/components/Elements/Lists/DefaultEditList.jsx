import {List} from 'antd';
import React from 'react';
import DeafultCardActions from '@/components/Elements/Cards/DeafultCardActions';
import DefaultFooterCopyright from '@/components/Elements/Text/DefaultFooterCopyright';
import styled from 'styled-components';

export default function DefaultImgItem(props) {
  if (process.browser) {
    console.log('Card INNER', props);
  }

  const listData = [];

  if (props.card && props.card.products && props.card.products.length !== 0)
    props.card.products.forEach(e => {
      listData.push({
        title: e.productName,
        content: e.productDescription,
        description: e.productLine,
        quantityInStock: e.quantityInStock,
        quantity: e.quantity,
        productCode: e.productCode,
        img: `http://localhost/images/bikes/${e.productCode}/${
          e.colors.split(',')[0]
        }/${e.productPhotos.split(',')[0]}`,
      });
    });

  const StyledCardItem = styled(List.Item)`
    width: 100%;
  `;

  const StyledCardItemTitle = styled.a`
    width: 100%;
    color: #1890ff;
    font-weight: bold;
  `;

  const StyledCardItemImg = styled.img`
    width: 100%;
    max-width: 250px;
  `;

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
      footer={<DefaultFooterCopyright />}
      renderItem={item => (
        <StyledCardItem
          key={item.productCode}
          id={item.productCode}
          extra={
            <StyledCardItemImg width="100%" alt={item.title} src={item.img} />
          }
        >
          <List.Item.Meta
            title={
              <StyledCardItemTitle href={item.href}>
                {item.title}
              </StyledCardItemTitle>
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
        </StyledCardItem>
      )}
    />
  );
}
