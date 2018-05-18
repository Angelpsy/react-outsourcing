import React from 'react';

const Header = (props) => {
    const handlerChangePair = (e) => {
        props.onChangePair(e.target.value)
    };

    return(
        <header className='b-header' onChange={handlerChangePair}>
            <select defaultValue={props.currentPair}>
                <option value={null} key={0}> </option>
                {props.pairs.map(
                    pair => <option value={pair.label} key={pair.id}>{pair.label}</option>
                )}
            </select>
        </header>
    );
};

export default Header;