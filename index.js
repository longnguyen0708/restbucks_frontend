import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Home from './components/Home'
import OrderNew from './components/OrderNew'
import OrderShow from './components/OrderShow'
import OrderUpdate from './components/OrderUpdate'
import OrderPay from './components/OrderPay'
import Receipt from './components/Receipt'
import Login from './components/Login'
import Register from './components/Register'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


render((
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>

            <Route path="/new_order" component={OrderNew}/>
            <Route path="/show_order" component={OrderShow}/>
            <Route path="/update_order" component={OrderUpdate}/>
            <Route path="/pay_order" component={OrderPay}/>
            <Route path="/receipt" component={Receipt}/>

            <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
        </Route>
  </Router>
    </MuiThemeProvider>

), document.getElementById('app'))
