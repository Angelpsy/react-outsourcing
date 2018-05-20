import React from 'react';
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

export default Loading;