import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {ActionTypes} from '../constants/AppConstants.js';
import {placeOrder} from '../utils/APIUtils.js';
import {getOrder} from '../utils/APIUtils.js';
import {updateOrder} from '../utils/APIUtils.js';

//var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  placeOrder: function(location, name, quantity, milk, size, shots, user_id) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.PLACE_ORDER,
      location: location,
      name: name,
      quantity: quantity,
      milk: milk,
      size: size,
      shots: shots,
      user_id: user_id
    });
    placeOrder(location, name, quantity, milk, size, shots, user_id);
  },

  getOrder: function(orderLink) {
    // AppDispatcher.handleViewAction({
    //   orderLink: orderLink
    // });
    getOrder(orderLink);
  },

  updateOrder: function(orderLink, location, name, quantity, milk, size, shots) {
    updateOrder(orderLink, location, name, quantity, milk, size, shots);
  },
};

