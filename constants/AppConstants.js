import keyMirror from 'keymirror';

var APIRoot = "http://localhost:3000";

module.exports = {

  APIEndpoints: {
    LOGIN:          APIRoot + "/v1/login",
    REGISTRATION:   APIRoot + "/v1/users",
    ORDERS:        APIRoot + "/orders"
  },

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({
    // Session
    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,

    // Routes
    REDIRECT: null,

    // Orders
    PLACE_ORDER: null,
    RECEIVE_ORDER: null,
    GET_ORDER: null
  })

};
