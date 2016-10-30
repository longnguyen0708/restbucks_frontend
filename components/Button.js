var React = require('react');

export default class Button extends React.Component {
  render() {
    let r = (this.props.isRender) ? <div><button onClick={() => this.props.onClick()}>{this.props.value}</button></div> : <div></div>;
    console.log('Button: ' + this.props.isRender + ' ' + this.props.value + ' ' + r)
    return (
        <div>
        {r}
        </div>
      );
  }
}


