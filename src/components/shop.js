import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shopRedux from '../reducers/shopReducer';
const actions = {...shopRedux.actions}


class Shop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shop: {}
    }
    this.navigateProduct = this.navigateProduct.bind(this)
  }

  componentDidMount() {
    this.props.getShop()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.shop !== this.props.shop) {
        this.setState({shop: this.props.shop})
    }
  }

  navigateProduct(e, pId) {
    e.stopPropagation()
    this.props.history.push('/product/' + pId)
  }
  
  render() {
    const {shop} = this.state
  return(
    <Fragment>
    {shop.categories && shop.categories.length > 0 && (
      <Fragment>
        {shop.categories.map((category, i) => {     
          return (
            <section key={category.topic}>
              <div className="container-fluid">
                <div className="container">
                  <div className="col-md-12">
                      <h3 className=" text-uppercase text-center textcolour mt-4">{category.topic}</h3>
                  </div>
          <div className="row">
            {category.products && category.products.map((product, i) => {     
              return (
                <div key={product.name+product.id} className="col-lg-3 col-md-3 col-12 ">
                  <div className="card  bg  mycard mt-5">
                    <div className="card-body" >
                      <img className="image-fluid size w-100 mb-2" src={product.photo} alt={product.name}/>
                        <h5 className="card-title text-left desc text-capitalize">{product.name}</h5>
                        <p className="card-text  text-justify">{product.text}</p>
                        <button type="button" className="btn btn-info btn-custom1" onClick={e=> this.navigateProduct(e, product.id)}>View Detail</button>
                    </div>
                  </div>
                </div>
              )}
            )}
            
          </div>
        </div>
      </div> 
            </section>
          ) 
        })}

      </Fragment>
      
    )}
    </Fragment>
  )
 }
}
   
   
export default connect(
  state => {
      return {
        shop: state.shop
      };
  }, dispatch => {
      return bindActionCreators(actions, dispatch)
  })(Shop);
    
    
                    
