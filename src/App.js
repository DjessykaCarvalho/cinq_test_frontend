import React from 'react';
import { Router } from "react-router-dom";
import Routes from './routes';
import { browserHistory } from './components/util';
import 'antd/dist/antd.css'

function App() {
  return (
    <Router history={browserHistory}>
      <Routes />
    </Router>
  );
}

export default App;
