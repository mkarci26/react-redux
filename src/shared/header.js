import React, {Fragment, Component} from 'react';
 
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      layout: this.props.layout,
      cart : this.props.cart
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.layout !== this.props.layout) {
        this.setState({layout: this.props.layout})
    }
  }

  render() {
    const {layout, cart} = this.state;
    
    return (
      <Fragment>
        <header>
            <nav className="navbar  lightcol navbar-light navbar-expand-lg">
                <div className="container">
                  <a href="#/" className="navbar-brand brand site-tile">
                      <img src={layout.logo} className=" mr-1" alt="logo" title="logo" />
                      {layout.siteTitle}
                  </a>
                </div>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                  <ul className="navbar-nav ml-auto">
                    {layout.menu && layout.menu.map((item, i) => {
                      return( 
                        <li className="nav-item" key={item.name+i}>
                          <a href={'#/' + item.url} className="nav-link mynav active page-scroll">{item.name}</a>
                        </li>
                      )}
                    )}
                    <li>
                    <button type="button" className="btn btn-primary position-relative mt-2" onClick={e =>  window.location.href='#/cart'}>
                      Cart 
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cart.length > 0 ? cart.length : ''}
                      </span>
                    </button>
                    </li>
                  </ul>
              </div>
            </nav>
        </header>
      </Fragment>
    );
  }
}


export default Header;
