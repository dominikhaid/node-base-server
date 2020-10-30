import {Card, Carousel, Button, Divider, Space, InputNumber} from 'antd';
import DeafultCardActions from '@/components/Elements/Cards/DeafultCardActions';
import Link from 'next/link';
import {useRouter} from 'next/router';
import styled from 'styled-components';
const {Meta} = Card;

export default function DefaultCard(props) {
  const router = useRouter();

  const colorList = () => {
    let colors = ['#364D79', '#FFFFFF', '#323234'];

    const StyledColorItem = styled.li`
      border: 1px solid black;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      list-style: none;
      display: inline-block;
      margin: 0px 0.5rem 0px 0px;
    `;

    const StyledColorList = styled.ul`
      margin: 1.5rem 0px 0.5rem 0px;
      padding: 0px;
    `;

    let htmlOut = [];
    colors.forEach(element => {
      htmlOut.push(<StyledColorItem style={{backgroundColor: element}} />);
    });
    return <StyledColorList>{htmlOut}</StyledColorList>;
  };

  const sliderImages = () => {
    let htmlOut = props.productPhotos.split(',');

    const StyledBaseImg = styled.img`
      width: 100%;
      height: auto;
    `;

    return htmlOut.map(e => {
      return (
        <Link href={link}>
          <StyledBaseImg
            src={`http://localhost/images/bikes/${props.productCode}/${
              props.colors.split(',')[0]
            }/${e}`}
          />
        </Link>
      );
    });
  };

  const StyledCard = styled(Card)`
    flex: 2 2 300px;
    margin: 0.8rem;
    max-width: 700px;
    box-shadow: 3px 3px 5px 0 rgba(245, 245, 245, 0.15) inset,
      -2px -2px 3px 0 rgba(0, 0, 0, 0.15) inset;
    padding: 0.2rem 0.5rem 0.5rem 0.5rem;
  `;

  let link = `/products/${props.productCode}`;

  return (
    <StyledCard hoverable={true} id={props.productCode} key={props.productCode}>
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
      <div style={{marginTop: '1rem'}}>
        <Divider />
        <Space size={'middle'} align="center">
          <Button
            onClick={e => {
              e.preventDefault();
              router.push(`/products/${props.productCode}`);
            }}
            type="primary"
            htmlType="submit"
          >
            Details
          </Button>
          <DeafultCardActions
            card={props.card}
            updateCard={props.updateCard}
            item={props}
          />
        </Space>
      </div>
    </StyledCard>
  );
}
