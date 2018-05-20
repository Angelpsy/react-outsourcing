import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Container} from 'reactstrap';

import Api from '../../../Api';
import Header from '../../Header';
import Orders from '../../Orders';
import Loading from '../../Loading';

import {
    fetchPairs,
    changeCurrentPair,
} from '../../../actionCreators';

class TradeHistoryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /**
             * @type Object[]
             */
            orders: [],
            /**
             * @type Boolean
             */
            isLoadingOrders: false,
        };
    }

    componentDidMount() {
        this.props.fetchPairs();
    }

    /**
     * @param pair
     */
    setOrdersByPair = (pair) => {
        if (!pair || !pair.label) {
            this.setState({
                orders: [],
            });
        } else {
            this.setState({
                isLoadingOrders: true,
            });
            Api.getTradeHistory24HByPair(pair.label)
                .then(data => {
                    this.setState({
                        orders: data,
                        isLoadingOrders: false,
                    });

                });
        }
    };

    /**
     * @param pair
     */
    setCurrentPair = (pair) => {
        this.props.changeCurrentPair(pair);
    };

    /**
     * @param pair
     */
    handlerChangePair = (pair) => {
        if (this.props.currentPair === pair) return;

        this.setOrdersByPair(pair);
        this.setCurrentPair(pair);
    };

    render() {
        return (
            <Container>
                {this.props.pairs &&
                    <Header
                        pairs={this.props.pairs}
                        currentPair={this.props.currentPair}
                        onChangePair={this.handlerChangePair}
                    />
                }

                <Loading isLoading={this.state.isLoadingOrders}/>

                {this.state.orders.length > 0 &&
                    <Orders
                        orders={this.state.orders}
                        isLoading={this.state.isLoadingOrders}
                    />
                }
            </Container>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        pairs: store.pairs.items,
        currentPair: store.pairs.currentPair,
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        fetchPairs() {
            dispatch(fetchPairs({force: false}));
        },
        /**
         * @param {Object} pair
         */
        changeCurrentPair(pair) {
            dispatch(changeCurrentPair(pair));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeHistoryContainer);