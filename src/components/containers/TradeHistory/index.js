import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Container} from 'reactstrap';

import Header from '../../Header';
import Orders from '../../Orders';
import Loading from '../../Loading';

import {
    fetchPairs as fetchPairsActionCreator,
    changeCurrentPair as changeCurrentPairActionCreator,
    fetchOrders as fetchOrdersActionCreator,
} from '../../../actionCreators';

class TradeHistoryContainer extends Component {
    componentDidMount() {
        this.props.fetchPairs();
    }

    /**
     * @param pair
     */
    handlerChangePair = (pair) => {
        if (this.props.currentPair === pair) return;

        this.props.changeCurrentPair(pair);
        this.props.fetchOrders(pair.label);
    };

    render() {
        return (
            <Container>
                <Header
                    pairs={this.props.pairs}
                    currentPair={this.props.currentPair}
                    onChangePair={this.handlerChangePair}
                />
                {this.props.pairs.length > 0 &&
                    [
                    <Loading
                        isLoading={this.props.isLoadingOrders}
                        key='loadingOrders'
                    />,

                    this.props.orders.length > 0 &&
                        <Orders
                            orders={this.props.orders}
                            isLoading={this.props.isLoadingOrders}
                            key='orders'
                        />
                    ]
                }
            </Container>
        );
    }
}

TradeHistoryContainer.propTypes = {
    fetchPairs: PropTypes.func.isRequired,
    changeCurrentPair: PropTypes.func.isRequired,
    fetchOrders: PropTypes.func.isRequired,
    pairs: PropTypes.array.isRequired,
    currentPair: PropTypes.object.isRequired,
    orders: PropTypes.array.isRequired,
    isLoadingOrders: PropTypes.bool,
};

const mapStateToProps = function(store) {
    return {
        pairs: store.pairs.items,
        currentPair: store.pairs.currentPair,
        orders: store.orders.items,
        isLoadingOrders: store.orders.isLoading,
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        fetchPairs() {
            dispatch(fetchPairsActionCreator({force: false}));
        },
        /**
         * @param {Object} pair
         */
        changeCurrentPair(pair) {
            dispatch(changeCurrentPairActionCreator(pair));
        },
        /**
         * @param {String} pairLabel
         */
        fetchOrders(pairLabel) {
            dispatch(fetchOrdersActionCreator(pairLabel));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeHistoryContainer);
