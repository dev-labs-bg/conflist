import React, { Component } from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

import iconsWhole from '../assets/images/icons-whole.png';
import icons from '../assets/images/icons.png';
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
        history: PropTypes.shape({
            location: PropTypes.shape({
                pathname: PropTypes.string.isRequired,
            }),
            listen: PropTypes.func.isRequired,
        }).isRequired,
    };

    static defaultProps = {
        user: {},
    };

    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
            dropdownOpen: false,
        };
    }

    componentDidMount() {
        // On route change, close navbar
        this.props.history.listen((location, action) => {
            this.setState({
                collapsed: true,
            });
        });
    }


    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    toggleDropdown = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    logOut = () => {
        this.props.removeToken();
        window.location.reload(true);
    }

    renderNavClass = (isAuthenticated) => {
        if (isAuthenticated) {
            return 'navbar-light bg-white';
        }

        return 'navbar-dark';
    }

    renderDropdown = (_isAuthenticated, _userData) => {
        if (!_isAuthenticated) {
            return (
                <NavLink
                    to="/login"
                    className="btn btn-primary font-weight-bold ml-3"
                >Login
                </NavLink>
            );
        }

        if (!_.isEmpty(_userData)) {
            return (
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} nav>
                    <DropdownToggle nav caret>
                        <img
                            className="mr-1 rounded-circle"
                            src={_userData.profileImg}
                            width="28"
                            height="28"
                            alt="profile avatar"
                        />
                        {_userData.name}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
                            <NavLink
                                activeClassName="color-primary"
                                className="dropdown-item px-0"
                                to="/profile-settings"
                            >
                                Profile Settings
                            </NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink
                                activeClassName="color-primary"
                                className="dropdown-item px-0"
                                to="/my-subscriptions"
                            >
                                My Subscriptions
                            </NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink
                                activeClassName="color-primary"
                                className="dropdown-item px-0"
                                to="/wanna-go-list"
                            >
                                Wanna Go List
                            </NavLink>
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="color-primary" onClick={this.logOut}>
                            Log out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            );
        }

        return null;
    }

    render() {
        const registerBkg = (
            <div className="text-center xs-mb-3 pt-4">
                <h2 className="register__title mx-auto font-weight-bold mt-4">
                    Discover your next conference you wanna go!
                </h2>
                <p className="register__text mx-auto font-weight-light mt-3 mb-0">
                    Conf List surfaces the best international conferences, worldwide.
                    It  &#39;s a place for conference-loving enthusiasts to collect
                    conferences and to subscribe for upcoming events related to the #tags
                    they care about.
                </p>
                <picture>
                    <source
                        media="(min-width: 900px)"
                        srcSet={iconsWhole}
                        sizes="1x, 2x"
                    />
                    <img
                        src={icons}
                        className="w-100 pb-3"
                        sizes="1x, 2x"
                        alt="register icons"
                    />
                </picture>
            </div>
        );

        const { isAuthenticated, history } = this.props;

        const style = {
            zIndex: '1',
        };

        const isOnHomePage = history.location.pathname === '/' || history.location.pathname === '/home';

        return (
            <div className={!isAuthenticated && isOnHomePage ? 'register' : ''}>
                <Navbar
                    style={style}
                    className={`p-relative navbar fixed-top navbar-expand-lg py-4 px-4 px-xxxl-5 ${this.renderNavClass(isAuthenticated)}`}
                >
                    <NavbarToggler
                        onClick={this.toggleNavbar}
                        className="mr-2"
                    />
                    <Collapse
                        className="justify-content-between"
                        isOpen={!this.state.collapsed}
                        navbar
                    >
                        <div className="navbar-item">
                            <NavLink
                                href="#home"
                                to="/home"
                            >
                                <Logo
                                    authentication={isAuthenticated}
                                />
                            </NavLink>
                        </div>
                        <div className="navbar-item">
                            <form
                                onSubmit={this.handleSubmit}
                                className="form-inline"
                            >
                                <Search />
                            </form>
                        </div>
                        <div className="navbar-item">
                            <Nav className="nav navbar-nav justify-content-end">
                                <NavItem>
                                    <NavLink
                                        activeClassName="color-primary"
                                        className="nav-link"
                                        to="/conference-suggest"
                                    >
                                        Suggest a conference
                                    </NavLink>
                                </NavItem>
                                { this.renderDropdown(isAuthenticated, this.props.user.data) }
                            </Nav>
                        </div>
                    </Collapse>
                </Navbar>

                {!isAuthenticated && isOnHomePage ? registerBkg : null}

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
