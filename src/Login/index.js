import React, { Component } from 'react';
import { connect } from 'react-redux';

import { jwtTokenRequest } from './duck';
import diskette from '../assets/images/diskette.svg';
import subscribe from '../assets/images/subscribe.svg';

class Login extends Component {
    render() {
        return (
            <div className="mx-auto pt-5 pb-5 container__register">
                <h2 className="text-center mb-4">
                    Before you register, check our benefits
                </h2>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="61"
                    height="27"
                    viewBox="0 0 61 27"
                >
                    <defs>
                        <path id="duwga" d="M202.8 248.64l-2.12 2.09-.6-2.92-2.09-2.13 2.92-.6 2.13-2.09.6 2.92 2.09 2.13z" />
                        <path id="duwgc" d="M252 247a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" />
                        <path id="duwgd" d="M208 225a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" />
                        <path id="duwge" d="M230.43 228.96a.52.52 0 1 1 .7-.76l2.68 2.5a.52.52 0 1 1-.7.76zm5.65-.2a.52.52 0 1 1 .7-.76l2.69 2.5a.52.52 0 1 1-.71.76zm-.53 4.97a.52.52 0 1 1 .7-.76l2.68 2.5a.52.52 0 1 1-.7.76zm-4.24.15a.52.52 0 1 1 .7-.76l2.68 2.5a.52.52 0 1 1-.7.76z" />
                        <clipPath id="duwgb"><use fill="#fff" xlinkHref="#duwga" />
                        </clipPath>
                    </defs>
                    <g>
                        <g transform="translate(-198 -224)">
                            <g>
                                <use
                                    fill="#fff"
                                    fillOpacity="0"
                                    stroke="#f2706d"
                                    strokeMiterlimit="50"
                                    strokeWidth="4"
                                    clipPath="url(&quot;#duwgb&quot;)"
                                    xlinkHref="#duwga"
                                />
                            </g>
                            <g>
                                <use fill="#f2706d" xlinkHref="#duwgc" />
                            </g>
                            <g>
                                <use fill="#f2706d" xlinkHref="#duwgd" />
                            </g>
                            <g>
                                <use fill="#f2706d" xlinkHref="#duwge" />
                            </g>
                        </g>
                    </g>
                </svg>


                <div className="d-flex align-items-center mb-4">
                    <img src={diskette} className="mr-4" alt="diskette" />

                    <h4 className="font-weight-normal mb-0">
                        You can
                        <span className="text-info"> Save </span>
                        conferences in your &quot;Wanna go&quot; list!
                    </h4>

                </div>

                <svg
                    className="ml-3"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="43"
                    height="34"
                    viewBox="0 0 43 34"
                >
                    <defs>
                        <path id="i4kla" d="M242.64 365.09l-3.69 3.6-1.04-5.05-3.6-3.69 5.05-1.04 3.69-3.6 1.04 5.05 3.6 3.69z" />
                        <path id="i4klb" d="M259 386a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" />
                        <path id="i4kle" d="M248 379a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" />
                        <path id="i4klf" d="M262 363a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" />
                        <path id="i4klg" d="M222 372.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0z" />
                        <clipPath id="i4klc"><use fill="#fff" xlinkHref="#i4kla" />
                        </clipPath>
                        <clipPath id="i4kld">
                            <use fill="#fff" xlinkHref="#i4klb" />
                        </clipPath>
                    </defs>
                    <g>
                        <g transform="translate(-222 -355)">
                            <g>
                                <use fill="#fff" fillоpacity="0" stroke="#f2706d" strokeMiterlimit="50" strokeWidth="4" clipPath="url(&quot;#i4klc&quot;)" xlinkHref="#i4kla" />
                            </g>
                            <g>
                                <use fill="#fff" fillоpacity="0" stroke="#f2706d" strokeMiterlimit="50" strokeWidth="4" clipPath="url(&quot;#i4kld&quot;)" xlinkHref="#i4klb" />
                            </g>
                            <g>
                                <use fill="#f2706d" xlinkHref="#i4kle" />
                            </g>
                            <g>
                                <use fill="#f2706d" xlinkHref="#i4klf" />
                            </g>
                            <g>
                                <use fill="#f2706d" xlinkHref="#i4klg" />
                            </g>
                        </g>
                    </g>
                </svg>

                <div className="d-flex align-items-center mb-5">
                    <img src={subscribe} className="mr-4" alt="subscribe" />

                    <h4 className="font-weight-normal mb-0">You can
                        <span className="text-info"> Subscribe </span>
                        for the upcoming conferences related to the #tags you care about!
                    </h4>

                </div>

                <div className="text-center">
                    <h2 className="font-weight-normal mb-4">
                        Login to conflist
                    </h2>
                    <a
                        target="_blank"
                        rel="noreferrer noopener"
                        href="https://api.conflist.devlabs-projects.com/auth/twitter?returnUrl=http://localhost:3000/loading"
                        className="btn btn-primary btn-twitter"
                    >
                        Log in with Twitter
                    </a>
                </div>

            </div>

        );
    }
}

const mapStateToProps = ({ token }) => {
    return {
        token,
    };
};

const mapDispatchToProps = {
    jwtTokenRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
