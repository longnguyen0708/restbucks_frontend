import {receiveOrder} from '../actions/ServerActionCreators.js';
import {receiveLogin} from '../actions/ServerActionCreators.js';
import {APIEndpoints} from '../constants/AppConstants.js';
import request from 'superagent';

function _getError(res) {
  var errorMsg = "Something went wrong, please try again";
  console.log(res)
  let json;
  if (json = res.body) {
    errorMsg = json.error;
  }
  return errorMsg;
}

function _getToken() {
    return sessionStorage.getItem('token');
}

//var APIEndpoints = AppConstants.APIEndpoints;

module.exports = {

  placeOrder: function(location, name, quantity, milk, size, shots, user_id) {
    request.post(APIEndpoints.ORDERS)
      .send({
        location: location,
        name: name,
        quantity: quantity,
        milk: milk,
        size: size,
        shots: shots,
        user_id: user_id
      })
        .set('Authorization', 'Token token=' + _getToken())
      .set('Accept', 'application/json')
        .type('application/json')
      .end(function(error, res) {
        if (res) {
          if (res.error) {
            var errorMsg = _getError(res);
            console.log(errorMsg);
            receiveOrder(null, errorMsg);
          } else {
            console.log(res);
            let json = res.body;
            json.link = res.header.location;
            receiveOrder(json, null);
            console.log(json);
          }
        }
      });
  },

    getOrder: function(orderLink) {
        request.get(orderLink)
            .set('Authorization', 'Token token=' + _getToken())
            .set('Accept', 'application/json')
            .end(function(error, res) {
                if (res) {
                    if (res.error) {
                        var errorMsg = _getError(res);
                        console.log(errorMsg);
                        receiveOrder(null, errorMsg);
                    } else {
                        console.log(res);
                        let json = res.body;
                        receiveOrder(json, null);
                        console.log(json);
                    }
                }
            });
    },

    updateOrder: function(orderLink, location, name, quantity, milk, size, shots) {
        request.put(orderLink)
            .set('Authorization', 'Token token=' + _getToken())
            .send({
                location: location,
                name: name,
                quantity: quantity,
                milk: milk,
                size: size,
                shots: shots
            })
            .set('Accept', 'application/json')
            .type('application/json')
            .end(function(error, res) {
                if (res) {
                    if (res.error) {
                        var errorMsg = _getError(res);
                        console.log(errorMsg);
                        receiveOrder(null, errorMsg);
                    } else {
                        console.log(res);
                        let json = res.body;
                        receiveOrder(json, null);
                        console.log(json);
                    }
                }
            });
    },

    cancelOrder: function(orderLink) {
        request.delete(orderLink)
            .set('Authorization', 'Token token=' + _getToken())
            .set('Accept', 'application/json')
            .end(function(error, res) {
                if (res) {
                    if (res.error) {
                        var errorMsg = _getError(res);
                        console.log(errorMsg);
                        receiveOrder(null, errorMsg);
                    } else {
                        receiveOrder(null, null);
                    }
                }
            });
    },

    payOrder: function(paymentLink, card_holder_name, card_number, expiry_month, expiry_year, amount) {
        request.put(paymentLink)
            .set('Authorization', 'Token token=' + _getToken())
            .send({
                card_holder_name: card_holder_name,
                card_number: card_number,
                expiry_month: expiry_month,
                expiry_year: expiry_year,
                amount: amount
            })
            .set('Accept', 'application/json')
            .type('application/json')
            .end(function(error, res) {
                if (res) {
                    if (res.error) {
                        var errorMsg = _getError(res);
                        console.log(errorMsg);
                        receiveOrder(null, errorMsg);
                    } else {
                        console.log(res);
                        let json = res.body;
                        receiveOrder(json, null);
                        console.log(json);
                    }
                }
            });
    },

    completeOrder: function(receiptLink) {
        request.delete(receiptLink)
            .set('Authorization', 'Token token=' + _getToken())
            .set('Accept', 'application/json')
            .end(function(error, res) {
                if (res) {
                    if (res.error) {
                        var errorMsg = _getError(res);
                        console.log(errorMsg);
                        receiveOrder(null, errorMsg);
                    } else {
                        console.log(res);
                        let json = res.body;
                        receiveOrder(json, null);
                        console.log(json);
                    }
                }
            });
    },


    login: function(email, password) {
        request.get(APIEndpoints.LOGIN)
            .set("Authorization", "Basic " + btoa(email + ":" + password))
            .set('Accept', 'application/json')
            .end(function(error, res) {
                if (res) {
                    if (res.error) {
                        var errorMsg = _getError(res);
                        console.log(errorMsg);
                        receiveLogin(null, errorMsg);
                    } else {
                        console.log(res);
                        let json = res.body;
                        receiveLogin(json, null);
                        console.log(json);
                    }
                }
            });
    },

    register: function(email, name, password) {
        request.post(APIEndpoints.REGISTRATION)
            .send({
                email: email,
                name: name,
                password: password
            })
            .set('Accept', 'application/json')
            .type('application/json')
            .end(function(error, res) {
                if (res) {
                    if (res.error) {
                        var errorMsg = _getError(res);
                        console.log(errorMsg);
                        receiveLogin(null, errorMsg);
                    } else {
                        console.log(res);
                        receiveLogin(null, null);
                    }
                }
            });
    },
};

