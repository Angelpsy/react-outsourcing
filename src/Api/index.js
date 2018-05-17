const BASE_URL = `https://poloniex.com`;

const Api = {
    /**
     * @returns {Promise<any>}
     */
    getPairs() {
        return fetch(`${BASE_URL}/public?command=returnTicker`)
            .then(res => res.json());
    },
    /**
     * @param pair
     * @param startTime time in sec
     * @param endTime time in sec
     * @returns {Promise<any>}
     */
    getTradeHistoryByPair({pair, startTime, endTime}) {
        return fetch(`${BASE_URL}/public?command=returnTradeHistory&currencyPair=${pair}&start=${startTime}&end=${endTime}`)
            .then(res => res.json());
    },
    /**
     * @param pair
     * @returns {*|Promise<any>}
     */
    getTradeHistory24HByPair(pair) {
        const endTime = Math.floor(Date.now() / 1000);
        const startTime = endTime - 24*60*60;
        return Api.getTradeHistoryByPair({pair, startTime, endTime});
    }
};

export default Api;