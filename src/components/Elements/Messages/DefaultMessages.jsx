import {message} from 'antd';

message.config({
  top: '20vh',
  duration: 2,
  maxCount: 3,
  rtl: false,
  prefixCls: 'ant-message',
});

const errorMsg = msg => {
  message.error({
    content: msg ? msg : 'From could not be validated!',
  });
};

const loadingMsg = msg => {
  message.loading({
    content: msg ? msg : 'Sending Data!',
  });
};

const succesMsg = msg => {
  message.success({
    content: msg ? msg : 'Sending Data!',
  });
};

module.exports = {errorMsg, loadingMsg, succesMsg, message};
