import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import productRedux from '../reducers/productReducer';
import cartRedux from '../reducers/cartReducer';

const actions = {...productRedux.actions, ...cartRedux.actions}


class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productId: this.props.match.params.productId,
      product: {}
    }
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidMount() {
    this.props.getProduct()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product && this.props.product.length > 0) {
      let res = this.props.product.filter(x=>x.id===parseInt(this.state.productId, 10)).pop()
      this.setState({product: res})
    }
  }
  addToCart(e, product) {
    e.stopPropagation()
    this.props.addCart(product)
  }

  render() {
    const {product} = this.state
      return(
         <Fragment>
           {product && (
           <div className="container">
            <div className=" row my-5 ">
              <div className="col-md-12 ">
               <div className="row">
                <div className="rounded-left col-md-6 bg-white">
                	<img className=" image-fluid mx-auto d-block " src={product.photo}
                   alt=""/>
                </div>

               <div className="rounded-right col-md-6 detail bg-dange pb-5">
                 <div className=" text-center mt-5">
	                 <h2 className="textcolour">{product.name}</h2>
	               </div> 
                  <div className="py-5 px-4">
	                  <p>{product.text} </p>
	                </div> 
	
	            <div className="text-center mt-4 price">
            
 	              <h3>{"Price: " + product.price}</h3>    		
            
                </div>
                <div className="text-center mt-4">
                <button type="button" className="btn btn-info btn-custom1" onClick={e=> this.addToCart(e, product)}>Add To Cart</button>
                </div>

        </div>
</div>
</div>
</div>
</div>
          )}
          {!product && (
            <div>Loading...</div>
          )}
         </Fragment>
      )
  }

}
export default connect(
  state => {
      return {
        product: state.product.data
      };
  }, dispatch => {
      return bindActionCreators(actions, dispatch)
  })(Product);
                        
