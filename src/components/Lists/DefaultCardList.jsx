import React, {useState} from 'react';
import BorderedH3 from '@/components/Elements/Titles/BorderedH3';
import DefaultCard from '@/components/Elements/Cards/DefaultCard';

import {message, Spin} from 'antd';
// import {LockOutlined, UserOutlined} from '@ant-design/icons';

export default function DefaultCardList(props) {
  //STATE
  const [loading, setLoading] = useState(false);

  if (!process.browser) {
    //console.debug('Home SERVER');
  } else {
    console.debug('PRODUCTS INNER', props);
  }

  //STYLE
  const productListStyle = {
    maxWidth: '900px',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: 'auto',
    marginTop: '3rem',
  };
  //HANLDER

  const errorMsg = () => {
    message.error({
      content: 'fFrom could not be validated!',
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
          title={props.products.length > 0 ? props.products[0].productLine : ''}
        />
        <section style={productListStyle}>
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
        </section>
      </Spin>
    </>
  );
}
