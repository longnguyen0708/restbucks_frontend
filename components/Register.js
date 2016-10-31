import React from 'react'
import UserStore from '../stores/UserStore.js';
import {register} from '../actions/UserActionCreators.js';
import ErrorNotice from '../components/ErrorNotice.js';
import {GridList, GridTile} from 'material-ui/GridList';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: '',
        confirmEmail: '',
        name: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handleConfirmEmailChange = this.handleConfirmEmailChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);

      this.onChange = this.onChange.bind(this);

  }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handleConfirmEmailChange(event) {
        this.setState({confirmEmail: event.target.value});
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        if (this.state.email != this.state.confirmEmail) {
            this.setState({error: "These email addresses don't match."})
        } else {
            register(this.state.email, this.state.name, this.state.password);
        }
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
      console.log('error:' + this.state.error)
    if (!this.state.error) {
        const path = '/login';
        console.log('redirect to: ' + path);
        this.context.router.push(path)
    }
  }

  render() {
    var error = (this.state.error) ? <ErrorNotice error={this.state.error}/> : <div></div>;
    return (
      <div style={styles.root}>
          <div style={styles.options}>
              <h1 style={styles.signIn}>Register</h1>
              <Divider />

              <TextField
                  id="text-field-controlled" fullWidth={true}
                  hintText="Email" value={this.state.email}
                  onChange={this.handleEmailChange} />
              <br/>
              <TextField
                  id="text-field-controlled" fullWidth={true}
                  hintText="Confirm email" value={this.state.confirmEmail}
                  onChange={this.handleConfirmEmailChange} />
              <br/>
              <TextField
                  id="text-field-controlled" fullWidth={true}
                  hintText="User name" value={this.state.name}
                  onChange={this.handleNameChange} />
              <br/>
              <TextField
                  id="text-field-controlled" type="password" fullWidth={true}
                  hintText="Password" value={this.state.password}
                  onChange={this.handlePasswordChange} />
              <br/><br/><br/>
              <RaisedButton  fullWidth={true} primary = {true} label="Register" onClick={() => this.handleSubmit()}/>

              {error}
          </div>
      </div>
     );
  }

}

Login.contextTypes = {
    router: React.PropTypes.object
}


const styles = {
    root: {
        color: '#64625d',
        height: 500
    },

    subroot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginLeft: 120
    },
    gridList: {

        overflowY: 'auto',
    },

    img: {
        height: 600,
        width: 1000
    },
    options: {
        marginTop: 50,
        marginLeft: 400,
        marginRight:400
    },
    strong: {
        width: 150
    },
    customDropdown:{
        width: 200
    },
    submitArea: {
        marginTop: 50,
    },
    cost: {
        fontSize: 30,
        color: '#64625d'
    },
    text: {
        width: 220
    },
    signIn: {
        marginLeft: 170
    }

};