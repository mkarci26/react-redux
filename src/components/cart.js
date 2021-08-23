import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cartRedux from '../reducers/cartReducer';
const actions = {...cartRedux.actions}


class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: this.props.cart
    }
  }

  componentDidMount() {
    //this.props.getCart()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cart !== this.props.cart) {
      this.setState({cart: this.props.cart})
    }
  }

  

  render() {
    const {cart} = this.state
    let sum = 0
    if(cart && cart.length > 0) {
      cart.forEach(e => {
        sum += e.price * e.qty
      });
    }
    
      return(
        <Fragment>
        {cart && cart.length > 0 && (
         <Fragment>
           <div className="container">
             <div className="row">
               <div className="offset-2 col-6 card card-body">
            {cart && cart.map((item,i) =>
              {return(
                <Fragment key={'cart'+item.name+i}>
                  <div className="row" >
                    <div className="col-xs-3 ">
                      <img className=" image-fluid pic mx-auto float-left mt-3 mb-3" src={item.photo} alt=""/>
                    </div>
                    <div className="col-xs-9 ">
                      <h5 className="textcolour text-left mt-3 mb-3">{item.name}</h5>
                      <p>{item.text}</p>
                      <h6>{"Price:  $ " + item.price}</h6> 
                      <p>Qty: {item.qty}</p>
                      <hr/>
                    </div> 

                    </div> 
                  </Fragment>
              )})
              }
            </div>
            
            <div className="col-4">
            <div className="container">
  <h2>Shopping Bag</h2>
  <div className="card">
    <div className="card-header textcolour"><h4>Price Details</h4></div>
    <div className="card-body price"> <h3>Cart Total: $ {sum}</h3></div> 
    <div className="card-footer textcolour"><h4>DISCOUNT 5% Added to cart</h4> </div>
  </div>
</div>

              {/* Total : {sum} */}
            </div>
          
            </div></div>
          </Fragment>
        )}
         
         {!cart || cart.length == 0 && (
          <div className="container mt-4">
            <div className="row align-items-center ">
            <div className="card col-sm-4 offset-sm-4">
            <div className="card-header "></div>
            <div className="card-body price text"> <h3>Cart is Empty</h3></div> 
            <div className="card-footer "></div>
            </div>
            </div>
          </div>
          )} 
          </Fragment>
      )}
  }


export default connect(
  state => {
      return {
        cart: state.cart.data
      };
  }, dispatch => {
      return bindActionCreators(actions, dispatch)
  })(Cart);