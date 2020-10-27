import React, {Component} from 'react';

const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    user: false,
    products: [],
    card: {
      products: [],
    },
    /**
     *
     * @param {object} state  State Object
     */
    updateState: state => {
      this.setState(state);
    },
    /**
     *
     * @param {array} arr Product Array
     */
    updateCard: arr => {
      if (!Array.isArray(this.state.card.products) && Array.isArray(arr)) {
        this.setState({card: {products: arr}});
        return;
      }
      let uptItems = this.state.card.products.map(e => {
        let ind = arr.findIndex(p => {
          return p.productCode === e.productCode;
        });

        if (ind !== -1) return arr[ind];
        return e;
      });
      uptItems = uptItems.filter(e => {
        return e.quantity !== 0;
      });

      if (uptItems.length < 1) {
        this.setState({card: {products: false}});
        return false;
      }
      if (uptItems) this.setState({card: {products: uptItems}});
      return this.state.card.products;
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
