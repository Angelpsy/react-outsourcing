import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import appReducers from '../reducers';


const store = createStore(
    appReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, promise()),
);

export default store;
