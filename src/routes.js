import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Users from './pages/user/Users';
import UserDetails from './pages/user/UserDetails';
import users from './assets/users.json';
import { store } from './components/util';

export default function Routes() {

  async function getListUsers() {
    return users
  }

  useEffect(() => {
    async function getData() {
      let result = [await getListUsers()];
      store.dispatch({ type: 'SET_USERS', payload: result[0] })
    }
    getData()
  })

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Users} />
        <Route path="/userDetails" component={UserDetails} />
      </Switch>
    </ BrowserRouter>
  )
}