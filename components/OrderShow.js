import React from 'react'
import OrderStore from '../stores/OrderStore.js';
import {getOrder} from '../actions/OrderActionCreators.js';
import ReactDOM from "react/lib/ReactDOM";
import ErrorNotice from '../components/ErrorNotice.js';


export default class OrderShow extends React.Component {

  // componentDidMount: function() {
  //   // if (!SessionStore.isLoggedIn()) {
  //   //   RouteActionCreators.redirect('app');
  //   // }
  // },

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      order: OrderStore.getOrder()
    };
    if (!this.state.order.name) {
        const orderLink = sessionStorage.getItem('orderLink');
        console.log('link: ' + orderLink)
        getOrder(orderLink);
    }
    this.handleSubmit = this.handleSubmit.bind(this);

      this.onChange = this.onChange.bind(this);

  }


    handleSubmit(event) {
        //alert('Text field value is: ' + this.state.value);
       // placeOrder(this.state.location, this.state.name, this.state.quantity, this.state.milk, this.state.size, this.state.shots, this.state.user_id);
    }

  componentDidMount() {
    OrderStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    OrderStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      error: OrderStore.getError(),
      order: OrderStore.getOrder()
    });
  }

  render() {
    var error = (this.state.error) ? <ErrorNotice error={this.state.error}/> : <div></div>;
    return (
      <div>
        {error}
        <div>{this.state.order.location}</div>
          <div>{this.state.order.name}</div>
          <div>{this.state.order.quantity}</div>
          <div>{this.state.order.milk}</div>
          <div>{this.state.order.size}</div>
          <div>{this.state.order.shots}</div>
          <div>{this.state.order.name}</div>
      </div>
     );
  }

}

