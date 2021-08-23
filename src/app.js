import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import layoutRedux from './reducers/home'
import Header from './shared/header'
import Footer from './shared/footer'
import Landing from './components/landing';
import Product from './components/product';
import Shop from './components/shop';
import Cart from './components/cart'
import { Route, Switch } from 'react-router-dom';
import ReactSnackBar from "react-js-snackbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';


const actions = {...layoutRedux.actions};

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      layout: {}
    }
  }

  componentDidMount() {
    this.props.getLayout()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.layout !== this.props.layout) {
        this.setState({layout: this.props.layout})

      if (this.props.layout.openSnackbar === true) {
        setTimeout(() => {
          this.props.closeSnackbar()
        }, 3000)
      }
    }
  }

  render() {
    const {layout} = this.state
    const {cart} = this.props
    return (
      <Fragment>
        <Header layout={layout} cart={cart}/>
        
         <Switch>
            <Route  exact path="/" component={Landing}/>
            <Route path="/product/:productId" component={Product} />
            <Route path="/shop" component={Shop} /> 
            <Route path="/cart" component={Cart}/>
        </Switch>
         
        
        <Footer layout={layout} />

        
        <ReactSnackBar Icon={<span role="img" aria-label="Notify">⏳</span>} Show={layout.openSnackbar}>
          {layout.snackMsg}
        </ReactSnackBar>
      </Fragment>
    );
  }
}


export default connect(
    state => {
        return {
            layout: state.home,
            cart: state.cart.data
        };
    }, dispatch => {
        return bindActionCreators(actions, dispatch)
    })(App);
