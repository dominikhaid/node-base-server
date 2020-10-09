import React, {useState} from 'react';
import BorderedH3 from '@/components/Elements/Titles/BorderedH3';
import DefaultItemList from '@/components/Elements/Lists/DefaultItemList';

import {message, Spin} from 'antd';
// import {LockOutlined, UserOutlined} from '@ant-design/icons';

export default function DefaultItemList(props) {
  //STATE
  const [loading, setLoading] = useState(false);

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
      content: 'from could not be validated.',
      className: 'ant-messages',
      style: {
        marginTop: '20vh',
      },
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
        <BorderedH3 title={props.card.category} />
        <section style={productListStyle}>
          <DefaultItemList card={props.card} />;
        </section>
      </Spin>
    </>
  );
}
