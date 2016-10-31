var React = require('react');
import { Link } from 'react-router'
import { IndexLink } from 'react-router'
import Header from '../components/Header'
import AppBar from 'material-ui/AppBar';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Header></Header>
        {this.props.children}
        <AppBar style={styles.footer} iconElementLeft={<div/>}/>
      </div>
    )
  }
}

App.contextTypes = {
    router: React.PropTypes.object
}

const styles ={
    footer: {
        backgroundColor:'#006341',
        height: 40,
        margin: 0
    }
}