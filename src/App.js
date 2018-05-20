import React, {Component} from 'react';
import {Provider} from 'react-redux';
import TradeHistoryContainer from './components/containers/TradeHistory';

import store from './store';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <TradeHistoryContainer/>
                </div>
            </Provider>
        );
    }
}

export default App;
