import {combineReducers} from 'redux'
import products from './Products'
//reducers
const AppReducer = combineReducers({
    products,
})
export default AppReducer