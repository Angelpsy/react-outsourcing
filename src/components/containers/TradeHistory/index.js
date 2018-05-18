import React, { Component } from 'react';
import Api from '../../../Api';
import Header from '../../Header';
import Orders from '../../Orders';
import Loading from '../../Loading';

import {Container} from 'reactstrap';

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
        this.setPairs();
    }
    
    setPairs = () => {
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
                
                this.setState({
                    pairs,
                });
            });
    };

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
                {this.state.pairs ?
                    <Header
                        pairs={this.state.pairs}
                        currentPair={this.state.currentPair}
                        onChangePair={this.handlerChangePair}
                    />
                : null}

                {this.state.isLoadingOrders ?
                    <Loading />
                    : null}

                {this.state.orders.length && !this.state.isLoadingOrders ?
                    <Orders
                        orders={this.state.orders}
                    />
                    : null}
            </Container>
        );
    }
}

export default TradeHistoryContainer;