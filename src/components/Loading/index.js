import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const Loading = (props) => {
    return(
        <Alert
            style={{'display': props.isLoading ? 'block' : 'none'}}
            color="dark"
            className='b-loading'>
            Loading...
        </Alert>
    );
};

Loading.propTypes = {
    isLoading: PropTypes.bool,
};

export default Loading;
