import React from 'react'
import OrderStore from '../stores/OrderStore.js';
import {payOrder} from '../actions/OrderActionCreators.js';
import ReactDOM from "react/lib/ReactDOM";
import ErrorNotice from '../components/ErrorNotice.js';


export default class OrderPay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
        card_holder_name: '',
        card_number:'',
        expiry_month: '',
        expiry_year: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
      this.handleCardHolderNameChange = this.handleCardHolderNameChange.bind(this);
      this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
      this.handleExpiryMonthChange = this.handleExpiryMonthChange.bind(this);
      this.handleExpiryYearChange = this.handleExpiryYearChange.bind(this);

      this.onChange = this.onChange.bind(this);

  }

    handleCardHolderNameChange(event) {
        this.setState({card_holder_name: event.target.value});
    }

    handleCardNumberChange(event) {
        this.setState({card_number: event.target.value});
    }
    handleExpiryMonthChange(event) {
        this.setState({expiry_month: event.target.value});
    }
    handleExpiryYearChange(event) {
        this.setState({expiry_year: event.target.value});
    }

    handleSubmit(event) {
        const paymentLink = sessionStorage.getItem('payment')
        const amount = sessionStorage.getItem('cost')
        console.log('amount: ' + amount)
        payOrder(paymentLink, this.state.card_holder_name, this.state.card_number, this.state.expiry_month, this.state.expiry_year, amount);
    }

  componentDidMount() {
      if (!sessionStorage.getItem('token')) {
          const path = '/login'
          this.context.router.push(path)
      }
      const paymentLink = OrderStore.getOrder().payment
    if (!paymentLink) {
        this.context.router.push('/')
    }
    OrderStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    OrderStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      error: OrderStore.getError()
    });
    if (OrderStore.getOrder().name) {
        const path = '/show_order';
        console.log('redirect to: ' + path);
        this.context.router.push(path)
    }
  }

  render() {
    var error = (this.state.error) ? <ErrorNotice error={this.state.error}/> : <div></div>;
    return (
      <div>
        {error}
        <div className="row">
            <div className="dfd" >
              <input type="text" placeholder="Card holder name" value={this.state.card_holder_name}
                     onChange={this.handleCardHolderNameChange} />
            </div>
            <div className="dfd" >
              <input type="text" placeholder="Card number" value={this.state.card_number}
                     onChange={this.handleCardNumberChange} />
            </div>
            <div className="dfd" >
              <input type="text" placeholder="Expiry month" value={this.state.expiry_month}
                     onChange={this.handleExpiryMonthChange} />
            </div>
            <div className="dfd" >
              <input type="text" placeholder="Expiry year" value={this.state.expiry_year}
                     onChange={this.handleExpiryYearChange} />
            </div>
            <div className="new-story__submit">
              <button onClick={this.handleSubmit}>
                Confirm payment
              </button>
            </div>
         </div>
      </div>
     );
  }

}

OrderPay.contextTypes = {
    router: React.PropTypes.object
}


