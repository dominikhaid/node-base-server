import React from 'react';
// import Link from 'next/link';
import DefaultCardList from '@/components/Lists/DefaultCardList';

export default function Products(props) {
  if (!process.browser) {
    //console.debug('Home SERVER');
  } else {
    //console.debug('Home CLIENT', props);
  }

  const mainCon = {
    maxWidth: '900px',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: 'auto',
    marginTop: '3rem',
    boxShadow:
      '2px 2px 5px rgba(40,40,40,0.2),-2px -2px 5px rgba(220,220,220,0.2)',
    padding: '2rem',
  };

  return (
    <React.Fragment>
      <div style={mainCon}>
        <DefaultCardList products={props.products} card={props.card} />
      </div>
    </React.Fragment>
  );
}
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  // const res = await fetch('https://.../posts');
  // const posts = await res.json();
  let products = [
    {
      productCode: 'S10_1949',
      productName: '1952 Alpine Renault 1300',
      productPhotos:
        'https://cdn.shopify.com/s/files/1/1772/1703/t/16/assets/cowboy-3-absolute-black_w_6.png,https://cdn.shopify.com/s/files/1/1772/1703/t/16/assets/cowboy-3-absolute-black_w_6.png',
      productLine: 'Classic Cars',
      productVendor: 'Classic Metal Creations',
      productDescription:
        'Turnable front wheels; steering function; detailed interior; detailed engine; opening hood; opening trunk; opening doors; and detailed chassis.',
      quantityInStock: 7305,
      buyPrice: 98.58,
      MSRP: 214.3,
      createdAt: '2020-10-06 23:52:34.966 +00:00',
      updatedAt: '2020-10-06 23:52:34.966 +00:00',
    },
    {
      productCode: 'S10_1951',
      productName: '1952 Alpine Renault 1300',
      productPhotos:
        'https://cdn.shopify.com/s/files/1/1772/1703/t/16/assets/cowboy-3-absolute-black_w_6.png,https://cdn.shopify.com/s/files/1/1772/1703/t/16/assets/cowboy-3-absolute-black_w_6.png',
      productLine: 'Classic Cars',
      productVendor: 'Classic Metal Creations',
      productDescription:
        'Turnable front wheels; steering function; detailed interior; detailed engine; opening hood; opening trunk; opening doors; and detailed chassis.',
      MSRP: 214.3,
    },
    {
      productCode: 'S10_1950',
      productName: '1952 Alpine Renault 1300',
      productPhotos:
        'https://cdn.shopify.com/s/files/1/1772/1703/t/16/assets/cowboy-3-absolute-black_w_6.png,https://cdn.shopify.com/s/files/1/1772/1703/t/16/assets/cowboy-3-absolute-black_w_6.png',
      productLine: 'Classic Cars',
      productVendor: 'Classic Metal Creations',
      productDescription:
        'Turnable front wheels; steering function; detailed interior; detailed engine; opening hood; opening trunk; opening doors; and detailed chassis.',
      quantityInStock: 7305,
      buyPrice: 98.58,
      MSRP: 214.3,
      createdAt: '2020-10-06 23:52:34.966 +00:00',
      updatedAt: '2020-10-06 23:52:34.966 +00:00',
    },
    {
      productCode: 'S10_1952',
      productName: '1952 Alpine Renault 1300',
      productPhotos:
        'https://cdn.shopify.com/s/files/1/1772/1703/t/16/assets/cowboy-3-absolute-black_w_6.png,https://cdn.shopify.com/s/files/1/1772/1703/t/16/assets/cowboy-3-absolute-black_w_6.png',
      productLine: 'Classic Cars',
      productVendor: 'Classic Metal Creations',
      productDescription:
        'Turnable front wheels; steering function; detailed interior; detailed engine; opening hood; opening trunk; opening doors; and detailed chassis.',
      quantityInStock: 7305,
      buyPrice: 98.58,
      MSRP: 214.3,
      createdAt: '2020-10-06 23:52:34.966 +00:00',
      updatedAt: '2020-10-06 23:52:34.966 +00:00',
    },
  ];

  let card = {
    products: ['S10_1949'],
    category: 'Bikes',
  };

  return {
    props: {
      products: products,
      card: card,
    },
  };
}
