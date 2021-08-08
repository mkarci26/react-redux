import React, {Fragment, Component} from 'react';
 
class Footer extends Component {
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
        <footer>
            <div className="container">
              {layout.copyRight}
            </div>
        </footer>
      </Fragment>
    );
  }
}


export default Footer;
