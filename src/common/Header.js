import React, { Component } from 'react';
import {
    Collapse,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button } from 'reactstrap';

import Logo from './Logo';
import profilePicture from '../assets/images/superKalo.jpg';

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            authentication: false,
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    renderNavClass = (isAuthenticated) => {
        if (isAuthenticated) {
            return 'navbar-light bg-white';
        }

        return 'navbar-dark';
    }

    render() {
        const registerBkg = (
            <div className="background-img text-center">
                <h2 className="register__title mx-auto font-weight-bold mt-4">
                    Discover your next conference you wanna go!
                </h2>
                <p className="register__text mx-auto font-weight-normal mt-3">
                    Conf List surfaces the best international conferences, worldwide.
                    It  &#39;s a place for conference-loving enthusiasts to collect
                    conferences and to subscribe for upcoming events related to the #tags
                    they care about.
                </p>
                <Button
                    className="font-weight-bold mx-auto mt-3"
                    color="primary"
                >Register
                </Button>
            </div>
        );

        return (
            <div className={!this.state.authentication ? 'register' : null}>
                <Nav
                    className={`navbar navbar-expand-lg py-4 px-5 ${this.renderNavClass(this.state.authentication)}`}
                >
                    <NavbarBrand className="mx-auto">
                        <Logo
                            authentication={this.state.authentication}
                        />
                    </NavbarBrand>

                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse
                        className="justify-content-end ml-md-4 text-left"
                        isOpen={!this.state.collapsed}
                        navbar
                    >

                        <form className="form-inline mt-xs-2 mr-xl-5">
                            <input
                                className="form-control mx-lg-3"
                                type="text"
                                placeholder="Search by location or technology..."
                            />
                        </form>

                        <Nav className="nav navbar-nav justify-content-end">
                            <NavItem className="nav-item">
                                <NavLink className="nav-link active" href="#">Home</NavLink>
                            </NavItem>

                            <NavItem className="nav-item">
                                <NavLink className="nav-link" href="#">Suggest a conference</NavLink>
                            </NavItem>
                            {!this.state.authentication ?
                                <div className="d-flex flex-md-row register__navitems">
                                    <NavItem className="nav-item">
                                        <NavLink className="nav-link" href="#">Login</NavLink>
                                    </NavItem>
                                    <Button
                                        className="font-weight-bold align-self-start"
                                        color="primary"
                                    >Register
                                    </Button>

                                </div>
                                :
                                <NavItem className="nav-item dropdown">
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            <img
                                                className="mr-1"
                                                src={profilePicture}
                                                width="28"
                                                height="28"
                                                alt="profile avatar"
                                            /> Kaloyan
                                        </DropdownToggle>
                                        <DropdownMenu >
                                            <DropdownItem>
                                                Profile Settings
                                            </DropdownItem>
                                            <DropdownItem>
                                                My Subscriptions
                                            </DropdownItem>
                                            <DropdownItem>
                                                Wanna go list
                                            </DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem>
                                                Log out
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>

                                </NavItem> }

                        </Nav>
                    </Collapse>
                </Nav>

                {!this.state.authentication ? registerBkg : null}

            </div>
        );
    }
}

export default Header;
