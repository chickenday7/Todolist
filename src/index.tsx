import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from "./state/todolist-reducer";
import {CssBaseline} from "@material-ui/core";

ReactDOM.render(
    <Provider store={store}>
        <CssBaseline />
    <App />
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
