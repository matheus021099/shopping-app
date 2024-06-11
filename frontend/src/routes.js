import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard/Dashboard';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/features" component={Features} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  </Router>
);

export default Routes;