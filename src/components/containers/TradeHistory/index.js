import React, { Component } from 'react';
import Api from '../../../Api';

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
    
    setPairs() {
        Api.getPairs()
            .then(data => {
                this.setState({
                    pairs: Object.keys(data),
                });
            });
    }

    /**
     * @param pair
     */
    setOrdersByPair(pair) {
        Api.getTradeHistory24HByPair(pair)
            .then(data => {
                this.setState({
                    orders: data,
                });
                
            });
    }

    /**
     * @param pair
     */
    setCurrentPair(pair) {
        this.setState({
            currentPair: pair,
        })
    }

    /**
     * @param pair
     */
    handlerChangePair(pair) {
        if (this.state.currentPair === pair) return;

        this.setOrdersByPair(pair);
        this.setCurrentPair(pair);
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default TradeHistoryContainer;