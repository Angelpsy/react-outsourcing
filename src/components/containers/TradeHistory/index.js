import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Container} from 'reactstrap';

import Api from '../../../Api';
import Header from '../../Header';
import Orders from '../../Orders';
import Loading from '../../Loading';

import {fetchPairs} from '../../../actionCreators';

class TradeHistoryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /**
             * @type String[]
             */
            pairs: [],
            /**
             * @type String
             */
            currentPair: null,
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
        if (!pair) {
            this.setState({
                orders: [],
            });
        } else {
            this.setState({
                isLoadingOrders: true,
            });
            Api.getTradeHistory24HByPair(pair)
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
        this.setState({
            currentPair: pair,
        })
    };

    /**
     * @param pair
     */
    handlerChangePair = (pair) => {
        if (this.state.currentPair === pair) return;

        this.setOrdersByPair(pair);
        this.setCurrentPair(pair);
    };

    render() {
        return (
            <Container>
                {this.props.pairs &&
                    <Header
                        pairs={this.props.pairs}
                        currentPair={this.state.currentPair}
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
        pairs: store.pairs.items
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        fetchPairs: function() {
            dispatch(fetchPairs({force: false}));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeHistoryContainer);