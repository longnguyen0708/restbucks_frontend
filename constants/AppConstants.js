import keyMirror from 'keymirror';

//var APIRoot = "http://localhost:3000";

var APIRoot = "http://ec2-54-70-90-14.us-west-2.compute.amazonaws.com:3000";

module.exports = {

  APIEndpoints: {
    LOGIN:          APIRoot + "/login",
    REGISTRATION:   APIRoot + "/users",
    ORDERS:        APIRoot + "/orders"
  },

  OrderStatus: {
    PAYMENT_EXPECTED: "payment expected"
  },

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({
    // Session
    RECEIVE_LOGIN: null,

    // Orders
    PLACE_ORDER: null,
    RECEIVE_ORDER: null,
    GET_ORDER: null


  })

};
