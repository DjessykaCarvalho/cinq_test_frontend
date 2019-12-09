import React, { useEffect } from 'react';
import { Router } from "react-router-dom";
import Routes from './routes';
import { browserHistory, store } from './components/util';
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
    <Router history={browserHistory}>
      <Routes />
    </Router>
  );
}

export default App;
