import React, { Component } from 'react';
import './index.css';
import {Table} from 'reactstrap';
import Pagination from 'react-js-pagination';

/**
 * @constant
 * @type {number}
 */
const SIZE_PAGE = 10;

class Orders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
        }
    }

    /**
     * @returns {number}
     */
    getMaxPage() {
        return Math.ceil(this.props.orders.length / SIZE_PAGE);
    }

    /**
     * @param page
     */
    handlerChangePage = (page) => {
        if (page > this.getMaxPage() || page < 1) return;

        this.setState({
            currentPage: page,
        });
    };

    render() {
        const orders = this.props.orders
            .slice((this.state.currentPage - 1) * SIZE_PAGE, this.state.currentPage * SIZE_PAGE);

        return(
            <div
                style={{'display': this.props.isLoading ? 'none' : 'block'}}
                className='b-orders'
            >
                <Table hover>
                    <thead>
                        <tr>
                            <th>id (tradeID)</th>
                            <th>date time</th>
                            <th>type</th>
                            <th>price (rate)</th>
                            <th>amount</th>
                            <th>total</th>
                        </tr>
                    </thead>
                    <tbody>
                    {orders.map(
                        order => <tr
                        key={order.tradeID}>
                            <td>{order.tradeID}</td>
                            <td>{order.date}</td>
                            <td>{order.type}</td>
                            <td>{order.rate}</td>
                            <td>{order.amount}</td>
                            <td>{order.total}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                <div className="b-order_pagination-wr">
                    <Pagination
                        activePage={this.state.currentPage}
                        itemsCountPerPage={SIZE_PAGE}
                        totalItemsCount={this.props.orders.length}
                        pageRangeDisplayed={5}
                        onChange={this.handlerChangePage}
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>
            </div>
        );
    }
}

export default Orders;