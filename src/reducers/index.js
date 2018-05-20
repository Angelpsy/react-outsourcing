import {combineReducers} from 'redux';
import pairs from './pairs';

const appReducers = combineReducers({
    pairs,
});

export default appReducers;
