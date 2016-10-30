var React = require('react');

export default class ErrorNotice extends React.Component {
  render() {
    return (
      <div className="error-notice">
          {this.props.error}
      </div>
      );
  }
}


