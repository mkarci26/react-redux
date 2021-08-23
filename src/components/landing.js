import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import landingRedux from '../reducers/landingReducer';
const actions = {...landingRedux.actions}

class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      landing: {}
    }
    this.navigateProduct = this.navigateProduct.bind(this)
  }

  componentDidMount() {
    this.props.getLanding()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.landing !== this.props.landing) {
        this.setState({landing: this.props.landing})
    }
  }

  navigateProduct(e, pId) {
    e.stopPropagation()
    this.props.history.push('/product/' + pId)
  }
  
  render() {
    const {landing} = this.state
    return (
      <Fragment>
        {landing.banner && (
          <section id="home">
            <div className="container-fluid">
              <img  className="image-fluid w-100" src={landing.banner.pic} alt={landing.banner.alt} />
            </div>
          </section>
        )}

        {landing.categories && landing.categories.length > 0 && (
          <Fragment>
            {landing.categories.map((category, i) => {     
              return (
                <section key={category.topic} className="">
                  <div className="container-fluid">
                    <div className="container">
                      <div className="col-md-12">
                          <h3 className=" text-uppercase text-center textcolour mt-4">{category.topic}</h3>
                      </div>
                <div className="row">
                  {category.products && category.products.map((product, i) => {     
                    return (
                      <div key={product.name} className="col-lg-3 col-md-3 col-12 ">
                        <div className="card  bg  mycard mt-5">
                          <div className="card-body" >
                            <img className="image-fluid size w-100 mb-2" src={product.photo}  alt={product.name}/>
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
  };
}


export default connect(
  state => {
      return {
          landing: state.landing
      };
  }, dispatch => {
      return bindActionCreators(actions, dispatch)
  })(Landing);


       
        

        
        