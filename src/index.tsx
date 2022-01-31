import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from "./state/todolist-reducer";

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
