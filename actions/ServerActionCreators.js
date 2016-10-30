import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {ActionTypes} from '../constants/AppConstants.js';

//var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  receiveOrder: function(json, error) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_ORDER,
      json: json,
      error: error
    });
  },


  receiveToken: function(json, error) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_TOKEN,
      json: json,
      error: error
    });
  },


};

