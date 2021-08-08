import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import layoutRedux from './reducers/home'
import Header from './shared/header'
import Footer from './shared/footer'
//import { Route, Switch } from 'react-router-dom';
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
    }
  }

  render() {
    const {layout} = this.state
    console.log(layout)
    return (
      <Fragment>
        <Header layout={layout} />
        {/*<Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </Switch>*/}
        
        
        <Footer layout={layout} />
      </Fragment>
    );
  }
}


export default connect(
    state => {
        return {
            layout: state.home.layout
        };
    }, dispatch => {
        return bindActionCreators(actions, dispatch)
    })(App);
