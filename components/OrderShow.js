import React from 'react'
import OrderStore from '../stores/OrderStore.js';
import {getOrder} from '../actions/OrderActionCreators.js';
import {cancelOrder} from '../actions/OrderActionCreators.js';
import {completeOrder} from '../actions/OrderActionCreators.js';
import ReactDOM from "react/lib/ReactDOM";
import ErrorNotice from '../components/ErrorNotice.js';
import Button from '../components/Button'
import {OrderStatus} from '../constants/AppConstants'
import {GridList, GridTile} from 'material-ui/GridList';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';


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
        if (orderLink)
            getOrder(orderLink);
    }
    this.handlePayClick = this.handlePayClick.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
      this.handleReceiptClick = this.handleReceiptClick.bind(this);
      this.handleRefreshClick = this.handleRefreshClick.bind(this);
      this.onChange = this.onChange.bind(this);

  }

    handleRefreshClick(event) {
        const orderLink = sessionStorage.getItem('orderLink');
        console.log('link: ' + orderLink)
        if (orderLink)
            getOrder(orderLink);
    }

    handlePayClick(event) {
        sessionStorage.setItem('payment', this.state.order.payment)
        sessionStorage.setItem('cost', this.state.order.cost)
        const path = '/pay_order'
        this.context.router.push(path)
    }

    handleUpdateClick(event) {
        const path = '/update_order'
        this.context.router.push(path)
    }

    handleCancelClick(event) {
        const orderLink = sessionStorage.getItem('orderLink');
        cancelOrder(orderLink)
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
          const path = '/'
          this.context.router.push(path)
      }
  }

  render() {
    var error = (this.state.error) ? <ErrorNotice error={this.state.error}/> : <div></div>;
      if (!this.state.order.name) {
          return (
              <div style={styles.noOrder}>
            <h2>You do not have any current order.</h2>
                  </div>
          )
      }
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
                    <img src={sessionStorage.getItem('itemImg')} style={styles.img}/>
                </GridTile>
                <GridTile
                    cols={1}
                    rows={2}>
                    <div style={styles.options}>
                        {(this.state.order.status=='Completed') ? <h1>Your Receipt</h1> : <h1>Your order</h1>}
                        <Divider />

                        <h2>{this.state.order.name}</h2>
                        <table>
                            <tbody>
                            <tr>
                                <td style={styles.strong}>
                                    <strong style={styles.strong}>Location:</strong>
                                </td>
                                <td>
                                    <div>{this.state.order.location}</div>
                                </td>
                            </tr>
                            <tr>
                                <td style={styles.strong}>
                                    <strong style={styles.strong}>Size:</strong>
                                </td>
                                <td>
                                    <div>{this.state.order.size}</div>
                                </td>
                            </tr>
                            <tr>
                                <td style={styles.strong}>
                                    <strong style={styles.strong}>Milk:</strong>
                                </td>
                                <td>
                                    <div>{this.state.order.milk}</div>
                                </td>
                            </tr>
                            <tr>
                                <td style={styles.strong}>
                                    <strong style={styles.strong}>Shots:</strong>
                                </td>
                                <td>
                                    <div>{this.state.order.shots}</div>
                                </td>
                            </tr>
                            <tr>
                                <td style={styles.strong}>
                                    <strong >Quantity:</strong>
                                </td>
                                <td>
                                    <div>{this.state.order.quantity}</div>
                                </td>
                            </tr>
                            <tr>
                                <td style={styles.strong}>
                                    {(this.state.order.status=='Completed') ? <strong >Paid time:</strong> :<strong >Status:</strong>}
                                </td>
                                <td>
                                    {(this.state.order.status=='Completed') ?<div>{this.state.order.paid_time}</div> :<div>{this.state.order.status}</div>}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <br/><br/>
                        <Divider/>
                        <br/>
                        <table>
                            <tbody>
                                <tr>
                                    <td style={styles.strong}>
                                        <strong style={styles.cost}>{'Total: $' + this.state.order.cost}</strong>
                                    </td>
                                    <td>
                                        <Button isPrimary = {true} isRender={this.state.order.payment} value="Pay" onClick={() => this.handlePayClick()}/>
                                        <Button  isPrimary = {true} isRender={this.state.order.receipts} value="View Receipt" onClick={() => this.handleReceiptClick()}/>
                                        <Button isPrimary = {true} isRender={this.state.order.status=='Preparing'} value="Refresh" onClick={() => this.handleRefreshClick()}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Button  isPrimary = {false} isRender={this.state.order.payment} value="Update Order" onClick={() => this.handleUpdateClick()}/>
                                    </td>
                                    <td>
                                        <Button  isPrimary = {false} isRender={this.state.order.payment} value="Cancel Order" onClick={() => this.handleCancelClick()}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {error}
                    </div>
                </GridTile>
            </GridList>
        </div>
    </div>

     );
  }

}

OrderShow.contextTypes = {
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
      noOrder: {
          height: 1000
      }
  };

