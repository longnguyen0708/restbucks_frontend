var React = require('react');
import { Link } from 'react-router'
import { IndexLink } from 'react-router'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            userName: sessionStorage.getItem('userName'),
            userId: sessionStorage.getItem('userId')
        };
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('userId');
        this.setState({
            userName: null,
            userId: null
        });
        this.context.router.push('/')
    }


  render() {
    return (
      <div>
        <h1>{this.state.userName}</h1>
        <ul role="nav">
          <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
            <li><Link to="/login" activeClassName="active">Log in</Link></li>
            <li><Link to="/new_order" activeClassName="active">New Order</Link></li>
            <li><div onClick={this.handleLogout}>Log out</div></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

App.contextTypes = {
    router: React.PropTypes.object
}
