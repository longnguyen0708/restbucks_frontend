import React from 'react'
import OrderStore from '../stores/OrderStore.js';
import {placeOrder} from '../actions/OrderActionCreators.js';
import ReactDOM from "react/lib/ReactDOM";
import ErrorNotice from '../components/ErrorNotice.js';


export default class OrderNew extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      location: '',
        name:'',
        quantity: '',
        milk: '',
        size: '',
        shots: '',
        user_id: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
      this.handleLocationChange = this.handleLocationChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleQuantityChange = this.handleQuantityChange.bind(this);
      this.handleMilkChange = this.handleMilkChange.bind(this);
      this.handleSizeChange = this.handleSizeChange.bind(this);
      this.handleShotsChange = this.handleShotsChange.bind(this);
      this.handleUserChange = this.handleUserChange.bind(this);

      this.onChange = this.onChange.bind(this);

  }

    handleLocationChange(event) {
        this.setState({location: event.target.value});
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }
    handleQuantityChange(event) {
        this.setState({quantity: event.target.value});
    }
    handleMilkChange(event) {
        this.setState({milk: event.target.value});
    }
    handleSizeChange(event) {
        this.setState({size: event.target.value});
    }
    handleShotsChange(event) {
        this.setState({shots: event.target.value});
    }
    handleUserChange(event) {
        this.setState({user_id: event.target.value});
    }

    handleSubmit(event) {
        //alert('Text field value is: ' + this.state.value);
        placeOrder(this.state.location, this.state.name, this.state.quantity, this.state.milk, this.state.size, this.state.shots, this.state.user_id);
    }

  componentDidMount() {
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
              <input type="text" placeholder="location" value={this.state.location}
                     onChange={this.handleLocationChange} />
            </div>
            <div className="dfd" >
              <input type="text" placeholder="name" value={this.state.name}
                     onChange={this.handleNameChange} />
            </div>
            <div className="dfd" >
              <input type="text" placeholder="quantity" value={this.state.quantity}
                     onChange={this.handleQuantityChange} />
            </div>
            <div className="dfd" >
              <input type="text" placeholder="milk" value={this.state.milk}
                     onChange={this.handleMilkChange} />
            </div>
            <div className="dfd" >
              <input type="text" placeholder="size" value={this.state.size}
                     onChange={this.handleSizeChange} />
            </div>
            <div className="dfd" >
              <input type="text" placeholder="shots" value={this.state.shots}
                     onChange={this.handleShotsChange} />
            </div>
            <div className="dfd" >
              <input type="text" placeholder="user_id" value={this.state.user_id}
                     onChange={this.handleUserChange} />
            </div>
            <div className="new-story__submit">
              <button onClick={this.handleSubmit}>
                Place order
              </button>
            </div>
         </div>
      </div>
     );
  }

}

OrderNew.contextTypes = {
    router: React.PropTypes.object
}


