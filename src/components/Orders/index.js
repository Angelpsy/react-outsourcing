import React, { Component } from 'react';

class Orders extends Component {
    render() {
        const orders = this.props.orders;

        return(
            <div className='b-orders'>
                <table>
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
                    {orders
                        .slice(0, 10)
                        .map(
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
                </table>
            </div>
        );
    }
}

export default Orders;