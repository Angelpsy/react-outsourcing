import {combineReducers} from 'redux';
import pairs from './pairs';
import orders from './orders';

const appReducers = combineReducers({
    pairs,
    orders,
});

export default appReducers;
