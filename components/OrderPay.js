import React from 'react'
import OrderStore from '../stores/OrderStore.js';
import {payOrder} from '../actions/OrderActionCreators.js';
import ReactDOM from "react/lib/ReactDOM";
import ErrorNotice from '../components/ErrorNotice.js';
import TextField from 'material-ui/TextField';
import Button from '../components/Button'
import {GridList, GridTile} from 'material-ui/GridList';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

export default class OrderPay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
        card_holder_name: '',
        card_number:'',
        expiry_month: '',
        expiry_year: '',
        orderName: OrderStore.getOrder().name
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
    <div style={styles.root}>
        <div style={styles.subroot}>
            <GridList
                cols={2}
                cellHeight={300}
                padding={0}
                style={styles.gridList}
            >
                <GridTile
                    cols={1}
                    rows={2}>
                    <img src={this.state.orderName + ".jpg"} style={styles.img}/>
                </GridTile>
                <GridTile
                    cols={1}
                    rows={2}>
                    <div style={styles.options}>
                        <h1>{'Total cost: $' + sessionStorage.getItem('cost')}</h1>
                        <Divider />

                        <h3>Please enter your credit/debit card information</h3>

                        <br/>
                        <TextField
                            id="text-field-controlled" fullWidth={true}
                            hintText="Card holder name" value={this.state.card_holder_name}
                               onChange={this.handleCardHolderNameChange} />
                        <br/>
                        <TextField
                            id="text-field-controlled" fullWidth={true}
                            hintText="Card number" value={this.state.card_number}
                               onChange={this.handleCardNumberChange} />
                        <br/>
                        <TextField style={styles.text}
                            id="text-field-controlled"
                            hintText="Expiry month" value={this.state.expiry_month}
                               onChange={this.handleExpiryMonthChange} />
                        <strong>&nbsp;/&nbsp;&nbsp;&nbsp;</strong>
                        <TextField style={styles.text}
                            id="text-field-controlled"
                            hintText="Expiry year" value={this.state.expiry_year}
                               onChange={this.handleExpiryYearChange} />
                        <br/><br/><br/>
                        <RaisedButton  primary = {true} label="Confirm payment" onClick={() => this.handleSubmit()}/>

                        {error}
                    </div>
                </GridTile>
            </GridList>
        </div>
    </div>

     );
  }

}

OrderPay.contextTypes = {
    router: React.PropTypes.object
}


const styles = {
    root: {
        color: '#64625d'
    },

    subroot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginLeft: 120
    },
    gridList: {

        overflowY: 'auto',
    },

    img: {
        height: 600,
        width: 1000
    },
    options: {
        marginTop: 30,
        marginLeft: 50,
        paddingRight:50
    },
    strong: {
        width: 150
    },
    customDropdown:{
        width: 200
    },
    submitArea: {
        marginTop: 50,
    },
    cost: {
        fontSize: 30,
        color: '#64625d'
    },
    text: {
        width: 220
    }

};