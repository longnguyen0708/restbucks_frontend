import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import About from './components/About'
import Repos from './components/Repos'
import Repo from './components/Repo'
import Home from './components/Home'
import OrderNew from './components/OrderNew'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/repos" component={Repos}>
      	<Route path="/repos/:userName/:repoName" component={Repo}/>
      </Route>
      
      <Route path="/about" component={About}/>
        <Route path="/orders" component={OrderNew}/>
    </Route>
  </Router>
), document.getElementById('app'))
