import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Home from './components/Home'
import OrderNew from './components/OrderNew'
import OrderShow from './components/OrderShow'
import OrderUpdate from './components/OrderUpdate'
import OrderPay from './components/OrderPay'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>

        <Route path="/new_order" component={OrderNew}/>
        <Route path="/show_order" component={OrderShow}/>
        <Route path="/update_order" component={OrderUpdate}/>
        <Route path="/pay_order" component={OrderPay}/>
    </Route>
  </Router>
), document.getElementById('app'))
