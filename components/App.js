var React = require('react');
import { Link } from 'react-router'
import { IndexLink } from 'react-router'
import Header from '../components/Header'

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Header></Header>
        {this.props.children}
      </div>
    )
  }
}

App.contextTypes = {
    router: React.PropTypes.object
}
