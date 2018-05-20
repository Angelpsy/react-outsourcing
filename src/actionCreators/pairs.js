import Api from '../Api';

export const PAIRS_REQUEST = 'PAIRS_REQUEST';
export const PAIRS_SUCCESS = 'PAIRS_SUCCESS';
export const PAIRS_FAILURE = 'PAIRS_FAILURE';

/**
 * @param {Boolean=} force
 * @returns {Function}
 */
export const fetchPairs = ({force=false}) => (dispatch, getState) => {
    if (!force && getState().pairs.items.length !== 0) return;

    dispatch({
        type: PAIRS_REQUEST,
    });
    Api.getPairs()
        .then(data => {
            const pairs = [];
            for (const pair in data) {
                if (data.hasOwnProperty(pair)) {
                    pairs.push({
                        id: data[pair].id,
                        label: pair,
                    });
                }
            }

            dispatch({
                type: PAIRS_SUCCESS,
                payload: {
                    pairs,
                }
            });
        })
        .catch(error => {
            dispatch({
                type: PAIRS_FAILURE,
                payload: {
                    error,
                }
            });
        });
};

export const PAIRS_CHANGE_CURRENT = 'PAIRS_CHANGE_CURRENT';
export const changeCurrentPair = (pair) => {
    return {
        type: PAIRS_CHANGE_CURRENT,
        payload: {
            pair,
        }
    }
};
