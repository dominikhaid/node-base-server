import React, {Component} from 'react';

const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    user: false,
    products: [],
    card: {
      products: [],
    },
    updateState: e => {
      this.setState(e);
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
