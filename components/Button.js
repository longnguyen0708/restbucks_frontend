var React = require('react');
import RaisedButton from 'material-ui/RaisedButton';
export default class Button extends React.Component {
  render() {
    let r = (this.props.isRender)
        ? <RaisedButton label={this.props.value} primary={this.props.isPrimary} onClick={() => this.props.onClick()} fullWidth={true}/>
        : <div></div>;
    console.log('Button: ' + this.props.isRender + ' ' + this.props.value + ' ' + r)
    return (
        <div>
        {r}
        </div>
      );
  }
}


