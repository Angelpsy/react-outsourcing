import React, {Component} from 'react';
import {
    Navbar,
    NavbarBrand,
    UncontrolledDropdown,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false
        };
    }


    handlerChangePair = (pair) => {
        this.props.onChangePair(pair);
    };

    toggleDropdown = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen,
        }));
    };

    render() {
        return(
            <Navbar color="light" light expand="md" className='b-header'>
                <NavbarBrand href="/">React-outsourcing</NavbarBrand>
                    <Dropdown
                        className="ml-auto"
                        direction="left"
                        size="sm"
                        isOpen={this.state.dropdownOpen}
                        toggle={this.toggleDropdown}>
                        <DropdownToggle caret>
                            {this.props.currentPair || 'Select Pair'}
                        </DropdownToggle>
                        <DropdownMenu persist>
                            {this.props.pairs.map(
                                pair => <DropdownItem
                                    key={pair.id}
                                    onClick={() => {this.handlerChangePair(pair.label)}}
                                >{pair.label}</DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
            </Navbar>
        );
    }
};

export default Header;