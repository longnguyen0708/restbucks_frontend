var React = require('react');
import { Link } from 'react-router'
import { IndexLink } from 'react-router'
import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Menu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/IconButton';

const styles = {
    first: {
        backgroundColor:'#006341',
        height: 40,
        margin: 0
    },
    root: {
        backgroundColor: '#f7f7f7'
    },
    logo: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
    },
    notLogin: {
        marginTop: 20,
        marginRight: 30,
    }
};

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('userId');

        this.context.router.push('/')
    }


  render() {
        var notLogin = <div style={styles.notLogin}>
            <FlatButton label="Log in" onClick={() => {this.context.router.push('/login')}}/>
            <span>|</span>
            <FlatButton label="Register" />
        </div>

        var logined = <div style={styles.notLogin}>
            <FlatButton label={sessionStorage.getItem('userName') + "\'s order"} onClick={() => {this.context.router.push('/show_order')}}/>
            <span>|</span>
            <FlatButton
                label="Log out"
                onClick={() => {
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('userName');
                    sessionStorage.removeItem('userId');
                    this.context.router.push('/')
                }}
            />
            </div>

      var barElementRight = (sessionStorage.getItem('token')) ? logined : notLogin
      console.log('token = ' + sessionStorage.getItem('token'))
    return (
        <div>
        <AppBar style={styles.first} iconElementLeft={<div/>}/>
        <AppBar
            style={styles.root}
            iconElementLeft={
                <IndexLink to="/"><Avatar
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Starbucks_Coffee_Logo.svg/1024px-Starbucks_Coffee_Logo.svg.png"
                        size={70}
                        style={styles.logo}
                    /></IndexLink>
                }
            iconElementRight={
                barElementRight
            }
        />
        </div>
    )
  }
}

Header.contextTypes = {
    router: React.PropTypes.object
}
