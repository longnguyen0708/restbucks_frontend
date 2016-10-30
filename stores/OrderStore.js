import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {ActionTypes} from '../constants/AppConstants.js';
import { EventEmitter } from 'events';

//var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';


// var _accessToken = sessionStorage.getItem('accessToken');
// var _email = sessionStorage.getItem('email');
let _error = null;
let _order = {};

class OrderStoreClass extends EventEmitter {

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }


  getOrder() {
    return _order;
  }


  getError() {
    return _error;
  }

};

const OrderStore = new OrderStoreClass();


AppDispatcher.register((payload) => {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_ORDER:
      if (action.json) {
        _order = action.json;
        if (_order.link) {
          sessionStorage.setItem('orderLink', _order.link);
        }
      }
      if (action.error) {
        _error = action.error;
      }
      OrderStore.emit(CHANGE_EVENT);
      break

    default:
  }
  
  return true;
});

export default OrderStore;

