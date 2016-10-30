var React = require('react');
import { Link } from 'react-router'
import { IndexLink } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>React Router Tutorial</h1>
        <ul role="nav">
          <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
            <li><Link to="/login" activeClassName="active">Login</Link></li>
            <li><Link to="/new_order" activeClassName="active">New Order</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
