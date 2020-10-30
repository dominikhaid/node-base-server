import React from 'react';
import BorderedH3 from '@/components/Elements/Titles/BorderedH3';
import DefaultEditList from '@/components/Elements/Lists/DefaultEditList';
import {message} from 'antd';
import styled from 'styled-components';

export default function DefaultShoppingList(props) {
  const StyledCardList = styled.section`
    display: flex;
    max-width: 900px;
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
        title={
          props.user &&
          props.user.contactFirstName &&
          props.user.contactLastName
            ? `Shopping Card of ${props.user.contactFirstName} ${props.user.contactLastName}`
            : 'Shopping Card'
        }
        style={{minWidth: '100%'}}
      />
      <StyledCardList>
        <DefaultEditList card={props.card} updateCard={props.updateCard} />
      </StyledCardList>
    </>
  );
}
