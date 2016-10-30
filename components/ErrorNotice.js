var React = require('react');

export default React.createClass({
  render: function() {
    return (
      <div className="error-notice">
          {this.props.error}
      </div>
      );
  }
});


