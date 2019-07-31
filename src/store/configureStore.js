import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist'
import {composeWithDevTools} from 'redux-devtools-extension'
import storage from 'redux-persist/lib/storage'
import api from '../config/ApiConnect'

import AppReducer from './reducers'

const middlewares = [thunk, api]

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: []
}

const persistedReducer = persistReducer(persistConfig, AppReducer)

export default () => {
    let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middlewares)))
    let persistor = persistStore(store)
    return {store, persistor}
}