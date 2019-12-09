import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Users from './pages/user/Users';
import UserDetails from './pages/user/UserDetails';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Users} />
        <Route path="/userDetails" component={UserDetails} />
      </Switch>
    </ BrowserRouter>
  )
}