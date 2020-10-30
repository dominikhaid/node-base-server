import React from 'react';
import BorderedH3 from '@/components/Elements/Titles/BorderedH3';
import DefaultCard from '@/components/Elements/Cards/DefaultCard';
import {message} from 'antd';
import styled from 'styled-components';

export default function DefaultCardList(props) {
  const StyledCardList = styled.section`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: auto;
    margin-top: 3rem;
  `;

  const errorMsg = () => {
    message.error({
      content: 'From could not be validated!',
    });
  };

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    errorMsg();
    // console.log('Failed:', errorInfo);
  };

  return (
    <>
      <BorderedH3
        title={props.products.length > 0 ? props.products[0].productLine : ''}
      />
      <StyledCardList>
        {props.products.length > 0 &&
          props.products.map(field => {
            return (
              <DefaultCard
                {...field}
                updateCard={props.updateCard}
                card={props.card}
              />
            );
          })}
      </StyledCardList>
    </>
  );
}
