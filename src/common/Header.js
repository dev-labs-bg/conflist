import React, { Component } from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

import { removeToken } from '../Login/duck';
import Search from '../Search';
import Logo from './Logo';

class Header extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        user: PropTypes.shape({
            data: PropTypes.shape({
                profileImg: PropTypes.string,
                name: PropTypes.string,
            }),
            isFetching: PropTypes.bool,
        }),
        removeToken: PropTypes.func.isRequired,
    };

    static defaultProps = {
        user: {},
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

    handleSubmit = (event) => {
        event.preventDefault();
    }

    renderNavClass = (isAuthenticated) => {
        if (isAuthenticated) {
            return 'navbar-light bg-white';
        }

        return 'navbar-dark';
    }

    logOut = () => {
        this.props.removeToken();
        window.location.reload(true);
    }

    renderDropdown = (_isAuthenticated, _userData) => {
        if (!_isAuthenticated) {
            return (
                <div className="d-flex flex-md-row register__navitems">
                    <NavItem>
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                    </NavItem>
                    <Link
                        to="/login"
                        className="btn btn-primary font-weight-bold align-self-start"
                    >Register
                    </Link>

                </div>
            );
        }

        if (!_.isEmpty(_userData)) {
            return (
                <UncontrolledDropdown nav>
                    <DropdownToggle nav caret>
                        <img
                            className="mr-1 rounded-circle"
                            src={_userData.profileImg}
                            width="28"
                            height="28"
                            alt="profile avatar"
                        /> {_userData.name}
                    </DropdownToggle>
                    <DropdownMenu >
                        <Link className="dropdown-item" to="/profile-settings">
                            Profile Settings
                        </Link>
                        <Link className="dropdown-item" to="/my-subscriptions">
                        My Subscriptions
                        </Link>
                        <Link className="dropdown-item" to="/wanna-go-list">
                            Wanna go list
                        </Link>
                        <DropdownItem divider />
                        <DropdownItem onClick={this.logOut}>
                            Log out
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            );
        }

        return null;
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
                <Link
                    to="/login"
                    className="btn btn-primary font-weight-bold align-self-start"
                >Register
                </Link>
            </div>
        );

        const { isAuthenticated } = this.props;

        const style = {
            zIndex: '1',
        };

        return (
            <div className={!isAuthenticated ? 'register' : null}>
                <Navbar
                    style={style}
                    className={`p-relative navbar navbar-expand-lg py-4 px-5 ${this.renderNavClass(isAuthenticated)}`}
                >
                    <NavbarBrand className="mx-auto">
                        <Logo
                            authentication={isAuthenticated}
                        />
                    </NavbarBrand>

                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse
                        className="ml-md-4 justify-content-end text-left"
                        isOpen={!this.state.collapsed}
                        navbar
                    >

                        <form
                            onSubmit={this.handleSubmit}
                            className="form-inline mt-xs-2 mx-auto"
                        >
                            <Search />
                        </form>

                        <Nav className="nav navbar-nav justify-content-end">
                            <NavItem>
                                <Link className="nav-link" to="/home">
                                    Home
                                </Link>
                            </NavItem>

                            <NavItem>
                                <Link className="nav-link" to="/conference-suggest">
                                    Suggest a conference
                                </Link>
                            </NavItem>
                            { this.renderDropdown(isAuthenticated, this.props.user.data) }
                        </Nav>
                    </Collapse>
                </Navbar>

                {!isAuthenticated ? registerBkg : null}

            </div>
        );
    }
}

const mapStateToProps = ({ user, auth }) => ({
    user,
    isAuthenticated: auth.isAuthenticated,
});

const mapDispatchToProps = {
    removeToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
