import React, {Component} from 'react';

const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    card: {
      products: [
        {
          productCode: 'S10_1949',
          productName: '1952 Alpine Renault 1300',
          quantityInStock: 7305,
          productPhotos:
            'https://cdn.shopify.com/s/files/1/1772/1703/t/16/assets/cowboy-3-absolute-black_w_6.png,https://cdn.shopify.com/s/files/1/1772/1703/t/16/assets/cowboy-3-absolute-black_w_6.png',
          productLine: 'Classic Cars',
          productVendor: 'Classic Metal Creations',
          quantityInStock: 7305,
          MSRP: 214.3,
          quantity: 2,
        },
        {
          productCode: 'S10_1951',
          productName: '1952 Alpine Renault 1300',
          quantityInStock: 7305,
          productPhotos:
            'https://cdn.shopify.com/s/files/1/1772/1703/t/16/assets/cowboy-3-absolute-black_w_6.png,https://cdn.shopify.com/s/files/1/1772/1703/t/16/assets/cowboy-3-absolute-black_w_6.png',
          productLine: 'Classic Cars',
          productVendor: 'Classic Metal Creations',
          MSRP: 214.3,
          quantity: 2,
        },
      ],
    },
  };

  render() {
    {
      return (
        <AppContext.Provider value={this.state}>
          {this.props.children}
        </AppContext.Provider>
      );
    }
  }
}

export {AppContext, AppProvider};
