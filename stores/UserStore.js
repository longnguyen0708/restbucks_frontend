import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {ActionTypes} from '../constants/AppConstants.js';
import { EventEmitter } from 'events';

//var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';


let _error = null;
let _token = null;

class UserStoreClass extends EventEmitter {

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }


  getOrder() {
    return _token;
  }


  getError() {
    return _error;
  }

};

const UserStore = new UserStoreClass();


AppDispatcher.register((payload) => {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_TOKEN:
      if (action.json) {
        _token = action.json.token;
          sessionStorage.setItem('token', _token);
      }
      if (action.error) {
        _error = action.error;
      } else {
        _error = null
      }
      UserStore.emit(CHANGE_EVENT);
      break

    default:
  }
  
  return true;
});

export default UserStore;

