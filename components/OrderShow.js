import React from 'react'
import OrderStore from '../stores/OrderStore.js';
import {getOrder} from '../actions/OrderActionCreators.js';
import {cancelOrder} from '../actions/OrderActionCreators.js';
import ReactDOM from "react/lib/ReactDOM";
import ErrorNotice from '../components/ErrorNotice.js';
import Button from '../components/Button'
import {OrderStatus} from '../constants/AppConstants'


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
    this.handlePayClick = this.handlePayClick.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
      this.onChange = this.onChange.bind(this);

  }


    handlePayClick(event) {
        //alert('Text field value is: ' + this.state.value);
       // placeOrder(this.state.location, this.state.name, this.state.quantity, this.state.milk, this.state.size, this.state.shots, this.state.user_id);
    }

    handleUpdateClick(event) {
        const path = '/update_order'
        this.context.router.push(path)
    }

    handleCancelClick(event) {
        const orderLink = sessionStorage.getItem('orderLink');
        cancelOrder(orderLink)
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
      console.log('order name after delete ' + this.state.order.name)
      if (!this.state.order.name) {
          const path = '/'
          this.context.router.push(path)
      }
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
          <div>{this.state.order.status}</div>
          <Button isRender={this.state.order.status == OrderStatus.PAYMENT_EXPECTED} value="Update Order" onClick={() => this.handleUpdateClick()}/>
          <Button isRender={this.state.order.payment} value="Pay" onClick={() => this.handlePayClick()}/>
          <Button isRender={this.state.order.status == OrderStatus.PAYMENT_EXPECTED} value="Cancel Order" onClick={() => this.handleCancelClick()}/>
      </div>
     );
  }

}

OrderShow.contextTypes = {
    router: React.PropTypes.object
}
