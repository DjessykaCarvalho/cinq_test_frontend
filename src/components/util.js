import { createBrowserHistory } from "history";
import { createStore } from 'redux'
import rootReducer from '../reducers'

export const browserHistory = createBrowserHistory();

export const store = createStore(rootReducer)