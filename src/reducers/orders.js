import {combineReducers} from 'redux';
import {
    ORDERS_REQUEST,
    ORDERS_SUCCESS,
    ORDERS_FAILURE,
} from '../actionCreators';

const items = (state = [], action) => {
    switch (action.type) {
        case ORDERS_SUCCESS:
            return action.payload.orders;
        default:
            return state;
    }
};

const isLoading = (state = false, action) => {
    switch (action.type) {
        case ORDERS_REQUEST:
            return true;
        case ORDERS_SUCCESS:
        case ORDERS_FAILURE:
            return false;
        default:
            return state;
    }
};

const orders = combineReducers({
    items,
    isLoading,
});

export default orders;
