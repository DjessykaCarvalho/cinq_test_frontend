import React, { useEffect } from 'react';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Routes from './routes';
import { store } from './components/util';
import users from './assets/users.json';
import 'antd/dist/antd.css'

function App() {
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
    <Router history={createBrowserHistory()}>
      <Routes />
    </Router>
  );
}

export default App;
