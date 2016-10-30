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

  getOrderResponse: function(json, error) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_ORDER,
      json: json,
      error: error
    });
  },

  // receiveStories: function(json) {
  //   AppDispatcher.handleServerAction({
  //     type: ActionTypes.RECEIVE_STORIES,
  //     json: json
  //   });
  // },
  //
  // receiveStory: function(json) {
  //   AppDispatcher.handleServerAction({
  //     type: ActionTypes.RECEIVE_STORY,
  //     json: json
  //   });
  // },
  //
  // receiveCreatedStory: function(json, errors) {
  //   AppDispatcher.handleServerAction({
  //     type: ActionTypes.RECEIVE_CREATED_STORY,
  //     json: json,
  //     errors: errors
  //   });
  // }
  
};

