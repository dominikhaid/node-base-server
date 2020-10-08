import {Card, Carousel, Button} from 'antd';
import {ShoppingCartOutlined, DeleteOutlined} from '@ant-design/icons';
import Link from 'next/link';
import {useRouter} from 'next/router';

const {Meta} = Card;

export default function DefaultCard(props) {
  const router = useRouter();
  const colorList = () => {
    let colors = ['#364D79', '#FFFFFF', '#323234'];
    let listStyle = {
      border: '1px solid black',
      borderRadius: '50%',
      width: '15px',
      height: '15px',
      listStyle: 'none',
      display: 'inline-block',
      margin: '0px 0.5rem 0px 0px',
    };
    let htmlOut = [];
    colors.forEach(element => {
      htmlOut.push(<li style={{...listStyle, backgroundColor: element}}></li>);
    });
    return (
      <ul style={{margin: '1.5rem 0px 0.5rem 0px', padding: '0px'}}>
        {htmlOut}
      </ul>
    );
  };

  const sliderImages = () => {
    let htmlOut = props.productPhotos.split(',');
    let imgStyle = {
      width: '100%',
      height: 'auto',
    };
    return htmlOut.map(e => {
      return (
        <Link href={link}>
          <img style={imgStyle} src={e} />
        </Link>
      );
    });
  };

  //STYLE
  const cardStyle = {
    style: {
      flex: '2 2 300px',
      margin: '0.8rem',
      maxWidth: '350px',
      boxShadow:
        '3px 3px 5px 0 rgba(245, 245, 245, 0.15) inset, -2px -2px 3px 0 rgba(0, 0, 0, .15) inset',
      padding: '0.2rem 0.5rem 0.5rem 0.5rem',
    },
  };

  const deleteStyle = {
    style: {
      color: 'red',
      fontSize: '1.5rem',
    },
  };

  const addStyle = {
    style: {
      fontSize: '1.5rem',
    },
  };

  const actions = [
    <Button
      onClick={e => {
        e.preventDefault();
        router.push(`/products/${props.productCode}`);
      }}
      type="primary"
      htmlType="submit"
    >
      Details
    </Button>,
    props.card.products.findIndex(e => {
      return e === props.productCode;
    }) === -1 ? (
      <ShoppingCartOutlined key="addCard" {...addStyle} />
    ) : (
      <DeleteOutlined key="removeCard" {...deleteStyle} />
    ),
  ];

  let link = `/products/${props.productCode}`;

  return (
    <Card
      hoverable={true}
      id={props.productCode}
      key={props.productCode}
      actions={actions}
      {...cardStyle}
    >
      <Carousel autoplay>{sliderImages()}</Carousel>

      <br />
      <small className="ant-primary">
        {props.productVendor} | {props.productLine}
      </small>
      <br />
      <br />
      <Meta title={props.productName} description={props.productDescription} />
      {colorList()}
      <p>{props.MSRP} $</p>
    </Card>
  );
}
