import React from 'react'
import OrderStore from '../stores/OrderStore.js';
import {getOrder} from '../actions/OrderActionCreators.js';
import {completeOrder} from '../actions/OrderActionCreators.js';
import ReactDOM from "react/lib/ReactDOM";
import ErrorNotice from '../components/ErrorNotice.js';
import Button from '../components/Button'
import {OrderStatus} from '../constants/AppConstants'


export default class Reciept extends React.Component {

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
        if (orderLink)
            getOrder(orderLink);
    }
    this.handleReceiptClick = this.handleReceiptClick.bind(this);
    this.onChange = this.onChange.bind(this);

  }

    handleReceiptClick(event) {
        completeOrder(this.state.order.receipts)
    }

  componentDidMount() {
      if (!sessionStorage.getItem('token')) {
          const path = '/login'
          this.context.router.push(path)
      }
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
      if (!this.state.error && !this.state.order.location) {
          const path = '/show_order'
          this.context.router.push(path)
      }
  }

  render() {
    var error = (this.state.error) ? <ErrorNotice error={this.state.error}/> : <div></div>;
    return (
      <div>
        {error}
          <div>{this.state.order.name}</div>
          <div>{this.state.order.quantity}</div>
          <div>{this.state.order.milk}</div>
          <div>{this.state.order.size}</div>
          <div>{this.state.order.shots}</div>
          <div>{this.state.order.cost}</div>
          <Button isRender={this.state.order.receipts} value="Complete Your Order" onClick={() => this.handleReceiptClick()}/>
      </div>
     );
  }

}

Reciept.contextTypes = {
    router: React.PropTypes.object
}
