import Api from '../Api';

export const ORDERS_REQUEST = 'ORDERS_REQUEST';
export const ORDERS_SUCCESS = 'ORDERS_SUCCESS';
export const ORDERS_FAILURE = 'ORDERS_FAILURE';


/**
 * @param {String} pairLabel
 */
export const fetchOrders = (pairLabel) => (dispatch) => {
    dispatch({
        type: ORDERS_REQUEST,
    });
    Api.getTradeHistory24HByPair(pairLabel)
        .then(data => {
            dispatch({
                type: ORDERS_SUCCESS,
                payload: {
                    orders: data,
                }
            });
        })
        .catch(error => {
            dispatch({
                type: ORDERS_FAILURE,
                payload: {
                    error,
                }
            });
        });
};