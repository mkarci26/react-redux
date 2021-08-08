import React, {Fragment, Component} from 'react';
 
class Header extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)
    this.state = {
      layout: this.props.layout
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.layout !== this.props.layout) {
        this.setState({layout: this.props.layout})
    }
  }

  render() {
    const {layout} = this.state;
    
    return (
      <Fragment>
        <header>
            <nav className="navbar  bg-light navbar-light navbar-expand-lg">
                <div className="container">
                    <a className="navbar-brand brand site-tile">
                        <img src={layout.logo} className=" mr-1" alt="logo" title="logo" />
                        {layout.siteTitle}
                    </a>
                </div>
            </nav>
        </header>
      </Fragment>
    );
  }
}


export default Header;
