// Dependency
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/lib/integration/react'
import configureStore from './store/configureStore'

// Components
import App from './App';

// Assets
import 'bootstrap/dist/css/bootstrap.css';


let {store, persistor} = configureStore()
ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>
    , document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();



