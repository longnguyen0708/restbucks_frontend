import React from 'react'
import UserStore from '../stores/UserStore.js';
import {login} from '../actions/UserActionCreators.js';
import ErrorNotice from '../components/ErrorNotice.js';


export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);

      this.onChange = this.onChange.bind(this);

  }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        login(this.state.email, this.state.password);
    }

  componentDidMount() {
      if (sessionStorage.getItem('token')) {
          this.context.router.push('/')
      }
    UserStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      error: UserStore.getError()
    });
    if (!this.state.error) {
        const path = '/';
        console.log('redirect to: ' + path);
        this.context.router.push(path)
    }
  }

  render() {
    var error = (this.state.error) ? <ErrorNotice error={this.state.error}/> : <div></div>;
    return (
      <div>
        {error}
        <div className="row">
            <div className="dfd" >
              <input type="text" placeholder="email" value={this.state.email}
                     onChange={this.handleEmailChange} />
            </div>
            <div className="dfd" >
              <input type="password" placeholder="password" value={this.state.password}
                     onChange={this.handlePasswordChange} />
            </div>

            <div className="new-story__submit">
              <button onClick={this.handleSubmit}>
                Login
              </button>
            </div>
         </div>
      </div>
     );
  }

}

Login.contextTypes = {
    router: React.PropTypes.object
}


