import {login} from '../utils/APIUtils.js';
import {register} from '../utils/APIUtils.js';

//var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  login: function(email, passowrd) {
    login(email, passowrd);
  },
  register: function(email, name, passowrd) {
    register(email, name, passowrd);
  },
};

