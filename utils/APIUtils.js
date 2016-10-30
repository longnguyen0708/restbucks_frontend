import {receiveOrder} from '../actions/ServerActionCreators.js';
import {getOrderResponse} from '../actions/ServerActionCreators.js';
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
            .set('Accept', 'application/json')
            .end(function(error, res) {
                if (res) {
                    if (res.error) {
                        var errorMsg = _getError(res);
                        console.log(errorMsg);
                        getOrderResponse(null, errorMsg);
                    } else {
                        console.log(res);
                        let json = res.body;
                        getOrderResponse(json, null);
                        console.log(json);
                    }
                }
            });
    },


};
