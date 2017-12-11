import React, { Component } from 'react';

import Logo from './Logo';
import profilePicture from '../assets/images/superKalo.jpg';


class Header extends Component {
    state = {
        authentication: false,
    }

    render() {
        const registerBkg = (
            <div className="background-img">
                <h2 className="register__title mx-auto font-weight-bold mt-4">Discover your next conference you wanna go!</h2>
                <p className="register__text mx-auto font-weight-normal mt-3">Conf List surfaces the best international conferences, worldwide. {"It's a place for conference-loving enthusiasts to collect conferences and to subscribe for upcoming events related to the #tags they care about."}</p>
                <button type="button" className="btn btn-primary font-weight-bold mx-auto mt-3">Register</button>
            </div>
        );

        return (
            <div className={!this.state.authentication ? 'register' : null}>

                <nav className={!this.state.authentication ? 'navbar navbar-expand-lg py-4 px-5 navbar-dark' : 'navbar navbar-expand-lg py-4 px-5 navbar-light bg-white '}>
                    <a className="navbar-brand mx-auto">
                        <Logo
                            authentication={this.state.authentication}
                        />
                    </a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse justify-content-end ml-md-4 text-left" id="navbarTogglerDemo02">

                        <form className="form-inline mt-xs-2 mr-xl-5">
                            <input className="form-control mx-lg-3" type="text" placeholder="Search by location or technology..." />
                        </form>

                        <ul className="nav navbar-nav justify-content-end">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Home</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#">Suggest a conference</a>
                            </li>
                            {!this.state.authentication ?
                                <div className="d-flex">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Login</a>
                                    </li>

                                    <button type="button" className="btn btn-primary align-self-start font-weight-bold ">Register</button>
                                </div>
                                :
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle active" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img className="mr-1" src={profilePicture} width="28" height="28" alt="profile avatar" />Kaloyan
                                    </a>

                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="#">Profile Settings</a>
                                        <a className="dropdown-item" href="#">My Subscriptions</a>
                                        <a className="dropdown-item" href="#">Wanna go list</a>
                                        <a className="dropdown-item" href="#">Log out</a>
                                    </div>
                                </li> }

                        </ul>
                    </div>
                </nav>

                {!this.state.authentication ? registerBkg : null}

            </div>
        );
    }
}

export default Header;
