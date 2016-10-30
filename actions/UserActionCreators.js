import {login} from '../utils/APIUtils.js';

//var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  login: function(email, passowrd) {
    login(email, passowrd);
  },
};

