import React from 'react'
import OrderStore from '../stores/OrderStore.js';
import {updateOrder} from '../actions/OrderActionCreators.js';
import ReactDOM from "react/lib/ReactDOM";
import ErrorNotice from '../components/ErrorNotice.js';
import {GridList, GridTile} from 'material-ui/GridList';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class OrderNew extends React.Component {

  // componentDidMount: function() {
  //   // if (!SessionStore.isLoggedIn()) {
  //   //   RouteActionCreators.redirect('app');
  //   // }
  // },

  constructor(props) {
    super(props);
    const order = OrderStore.getOrder();
    this.state = {
        error: null,
        location: order.location,
        name: order.name,
        quantity: order.quantity,
        milk: order.milk,
        size: order.size,
        shots: order.shots,
        orderName: OrderStore.getOrder().name
    };
    this.handleSubmit = this.handleSubmit.bind(this);
      this.handleLocationChange = this.handleLocationChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleQuantityChange = this.handleQuantityChange.bind(this);
      this.handleMilkChange = this.handleMilkChange.bind(this);
      this.handleSizeChange = this.handleSizeChange.bind(this);
      this.handleShotsChange = this.handleShotsChange.bind(this);

      this.onChange = this.onChange.bind(this);

  }

    handleLocationChange(event, index, value) {
        this.setState({location: value});
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }
    handleQuantityChange(event, index, value) {
        this.setState({quantity: value});
    }
    handleMilkChange(event, index, value) {
        this.setState({milk: value});
    }
    handleSizeChange(event, index, value) {
        this.setState({size: value});
    }
    handleShotsChange(event, index, value) {
        this.setState({shots: value});
    }


    handleSubmit(event) {
        //alert('Text field value is: ' + this.state.value);
        const orderLink = sessionStorage.getItem('orderLink');
        updateOrder(orderLink, this.state.location, this.state.name, this.state.quantity, this.state.milk, this.state.size, this.state.shots);
    }

  componentDidMount() {
      if (!sessionStorage.getItem('token')) {
          const path = '/login'
          this.context.router.push(path)
      }
    if (!this.state.name) {
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
                        <h2>{this.state.orderName}</h2>
                        <table>
                            <tbody>
                            <tr>
                                <td style={styles.strong}>
                                    <strong style={styles.strong}>Location:</strong>
                                </td>
                                <td>
                                    <DropDownMenu value={this.state.location} onChange={this.handleLocationChange}
                                                  autoWidth={false} style={styles.customDropdown}>
                                        <MenuItem value={'Take away'} primaryText="Take away" />
                                        <MenuItem value={'In shop'} primaryText="In shop" />
                                    </DropDownMenu>
                                </td>
                            </tr>
                            <tr>
                                <td style={styles.strong}>
                                    <strong style={styles.strong}>Size:</strong>
                                </td>
                                <td>
                                    <DropDownMenu value={this.state.size} onChange={this.handleSizeChange}
                                                  autoWidth={false} style={styles.customDropdown}>
                                        <MenuItem value={'Small'} primaryText="Small" />
                                        <MenuItem value={'Medium'} primaryText="Medium" />
                                        <MenuItem value={'Large'} primaryText="Large" />
                                    </DropDownMenu>
                                </td>
                            </tr>
                            <tr>
                                <td style={styles.strong}>
                                    <strong style={styles.strong}>Milk:</strong>
                                </td>
                                <td>
                                    <DropDownMenu value={this.state.milk} onChange={this.handleMilkChange}
                                                  autoWidth={false} style={styles.customDropdown}>
                                        <MenuItem value={'Skim'} primaryText="Skim" />
                                        <MenuItem value={'Semi'} primaryText="Semi" />
                                        <MenuItem value={'Whole'} primaryText="Whole" />
                                    </DropDownMenu>
                                </td>
                            </tr>
                            <tr>
                                <td style={styles.strong}>
                                    <strong style={styles.strong}>Shots:</strong>
                                </td>
                                <td>
                                    <DropDownMenu value={this.state.shots} onChange={this.handleShotsChange}
                                                  autoWidth={false} style={styles.customDropdown}>
                                        <MenuItem value={'Single'} primaryText="Single" />
                                        <MenuItem value={'Double'} primaryText="Double" />
                                        <MenuItem value={'Triple'} primaryText="Triple" />
                                    </DropDownMenu>
                                </td>
                            </tr>
                            <tr>
                                <td style={styles.strong}>
                                    <strong >Quantity:</strong>
                                </td>
                                <td>
                                    <DropDownMenu value={this.state.quantity} onChange={this.handleQuantityChange}
                                                  autoWidth={false} style={styles.customDropdown}>
                                        <MenuItem value={1} primaryText="1" />
                                        <MenuItem value={2} primaryText="2" />
                                        <MenuItem value={3} primaryText="3" />
                                        <MenuItem value={4} primaryText="4" />
                                        <MenuItem value={5} primaryText="5" />
                                    </DropDownMenu>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div style={styles.submitArea}>
                            <RaisedButton label="Update order" primary={true} onClick={this.handleSubmit} />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <img src="http://demandware.edgesuite.net/aafv_prd/on/demandware.static/Sites-Starbucks-Site/-/default/dw3175ad02/images/starslibra.png"/>
                            {error}

                        </div>
                    </div>
                </GridTile>
            </GridList>
        </div>
    </div>

     );
  }

}

OrderNew.contextTypes = {
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
        marginLeft: 50
    },
    strong: {
        width: 150
    },
    customDropdown:{
        width: 200
    },
    submitArea: {
        marginTop: 50,
    }
};

