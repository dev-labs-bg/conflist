import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

import Logo from './Logo';
import profilePicture from '../assets/images/superKalo.jpg';

class Header extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
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
                <a
                    href="/login"
                    className="btn btn-primary font-weight-bold mx-auto mt-3"
                >Register
                </a>
            </div>
        );

        const { isAuthenticated } = this.props;

        return (
            <div className={!isAuthenticated ? 'register' : null}>
                <Navbar
                    className={`navbar navbar-expand-lg py-4 px-5 ${this.renderNavClass(isAuthenticated)}`}
                >
                    <NavbarBrand className="mx-auto">
                        <Logo
                            authentication={isAuthenticated}
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
                            <NavItem>
                                <Link className="nav-link" to="/home">
                                    Home
                                </Link>
                            </NavItem>

                            <NavItem>
                                <NavLink className="nav-link" href="#">Suggest a conference</NavLink>
                            </NavItem>
                            {!isAuthenticated ?
                                <div className="d-flex flex-md-row register__navitems">
                                    <NavItem>
                                        <Link className="nav-link" to="/login">
                                            Login
                                        </Link>
                                    </NavItem>
                                    <a
                                        href="/login"
                                        className="btn btn-primary font-weight-bold align-self-start"
                                    >Register
                                    </a>

                                </div>
                                :
                                <UncontrolledDropdown nav>
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
                                        <Link className="dropdown-item" to="/profile-settings">
                                            Profile Settings
                                        </Link>
                                        <Link className="dropdown-item" to="/my-subscriptions">
                                        My Subscriptions
                                        </Link>
                                        <DropdownItem>
                                            Wanna go list
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            Log out
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            }

                        </Nav>
                    </Collapse>
                </Navbar>

                {!isAuthenticated ? registerBkg : null}

            </div>
        );
    }
}

export default Header;
