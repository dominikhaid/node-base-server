import React, {useState} from 'react';
import BorderedH3 from '@/components/Elements/Titles/BorderedH3';
import DefaultEditList from '@/components/Elements/Lists/DefaultEditList';
import {message, Spin} from 'antd';

export default function DefaultShoppingList(props) {
  const [loading, setLoading] = useState(false);

  const productListStyle = {
    maxWidth: '900px',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: 'auto',
    marginTop: '3rem',
  };

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
      <Spin tip="Login..." spinning={loading} delay={500}>
        <BorderedH3
          title={
            props.user &&
            props.user.contactFirstName &&
            props.user.contactLastName
              ? `Shopping Card of ${props.user.contactFirstName} ${props.user.contactLastName}`
              : 'Shopping Card'
          }
        />
        <section style={productListStyle}>
          <DefaultEditList card={props.card} updateCard={props.updateCard} />
        </section>
      </Spin>
    </>
  );
}
