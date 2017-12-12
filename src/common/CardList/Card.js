import React from 'react';

import smashing from '../../assets/images/smashing-conf.png';

const card = () => (
    <div className="card mb-2">
        <img
            className="card-img"
            src={smashing}
            width="243"
            height="202"
            alt="Card cap"
        />

        <div className="card-body">
            <span className="d-flex justify-content-between">

                <div className="card__info">
                    <svg
                        className="mr-1"
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        <title>Small-calendar svg</title>
                        <desc>Small calendar logo</desc>
                        <g
                            id="Page-1"
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                        >
                            <g
                                id="conflist-home-page-logged-in"
                                transform="translate(-572.000000, -677.000000)"
                                fillRule="nonzero"
                                fill="#F2706D"
                            >
                                <g
                                    id="conf-card"
                                    transform="translate(309.000000, 639.000000)"
                                >
                                    <g
                                        id="small-calendar-copy"
                                        transform="translate(263.000000, 38.000000)"
                                    >
                                        <path
                                            d="M17.4170625,1.78125 L14.84375,1.78125 L14.84375,0.59375 C14.84375,0.26540625 14.5783438,0 14.25,0 C13.9216562,0 13.65625,0.26540625 13.65625,0.59375 L13.65625,1.78125 L10.09375,1.78125 L10.09375,0.59375 C10.09375,0.26540625 9.82775,0 9.5,0 C9.17225,0 8.90625,0.26540625 8.90625,0.59375 L8.90625,1.78125 L5.34375,1.78125 L5.34375,0.59375 C5.34375,0.26540625 5.07775,0 4.75,0 C4.42225,0 4.15625,0.26540625 4.15625,0.59375 L4.15625,1.78125 L1.58353125,1.78125 C0.7089375,1.78125 0,2.48959375 0,3.3641875 L0,17.4164687 C0,18.2910625 0.7089375,19 1.58353125,19 L17.4170625,19 C18.2916562,19 19,18.2910625 19,17.4164687 L19,3.3641875 C19,2.48959375 18.2916562,1.78125 17.4170625,1.78125 Z M17.8125,17.4164687 C17.8125,17.6349687 17.6349687,17.8125 17.4170625,17.8125 L1.58353125,17.8125 C1.36503125,17.8125 1.1875,17.6349687 1.1875,17.4164687 L1.1875,3.3641875 C1.1875,3.14628125 1.36503125,2.96875 1.58353125,2.96875 L4.15625,2.96875 L4.15625,4.15625 C4.15625,4.48459375 4.42225,4.75 4.75,4.75 C5.07775,4.75 5.34375,4.48459375 5.34375,4.15625 L5.34375,2.96875 L8.90625,2.96875 L8.90625,4.15625 C8.90625,4.48459375 9.17225,4.75 9.5,4.75 C9.82775,4.75 10.09375,4.48459375 10.09375,4.15625 L10.09375,2.96875 L13.65625,2.96875 L13.65625,4.15625 C13.65625,4.48459375 13.9216562,4.75 14.25,4.75 C14.5783438,4.75 14.84375,4.48459375 14.84375,4.15625 L14.84375,2.96875 L17.4170625,2.96875 C17.6349687,2.96875 17.8125,3.14628125 17.8125,3.3641875 L17.8125,17.4164687 Z"
                                            id="Shape"
                                        />
                                        <rect
                                            id="Rectangle-path"
                                            x="4.15625"
                                            y="7.125"
                                            width="2.375"
                                            height="1.78125"
                                        />
                                        <rect
                                            id="Rectangle-path"
                                            x="4.15625"
                                            y="10.09375"
                                            width="2.375"
                                            height="1.78125"
                                        />
                                        <rect
                                            id="Rectangle-path"
                                            x="4.15625"
                                            y="13.0625"
                                            width="2.375"
                                            height="1.78125"
                                        />
                                        <rect
                                            id="Rectangle-path"
                                            x="8.3125"
                                            y="13.0625"
                                            width="2.375"
                                            height="1.78125"
                                        />
                                        <rect
                                            id="Rectangle-path"
                                            x="8.3125"
                                            y="10.09375"
                                            width="2.375"
                                            height="1.78125"
                                        />
                                        <rect
                                            id="Rectangle-path"
                                            x="8.3125"
                                            y="7.125"
                                            width="2.375"
                                            height="1.78125"
                                        />
                                        <rect
                                            id="Rectangle-path"
                                            x="12.46875"
                                            y="13.0625"
                                            width="2.375"
                                            height="1.78125"
                                        />
                                        <rect
                                            id="Rectangle-path"
                                            x="12.46875"
                                            y="10.09375"
                                            width="2.375"
                                            height="1.78125"
                                        />
                                        <rect
                                            id="Rectangle-path"
                                            x="12.46875"
                                            y="7.125"
                                            width="2.375"
                                            height="1.78125"
                                        />
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                    <span className="card__dates">12nd&#45;14th June, 2017
                        <span className="text-info"> | </span> New York, USA
                    </span>
                </div>
                <div className="card__button">
                    <svg className="card__heart mr-1" width="20" height="19" viewBox="0 0 20 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <title>Heart shape svg</title>
                        <desc>Heart shape with red border</desc>
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="conflist-home-page-logged-in" transform="translate(-986.000000, -889.000000)">
                                <g id="conf-card" transform="translate(309.000000, 866.000000)">
                                    <g id="ic_favorite_border_black_24px-copy" transform="translate(675.000000, 20.000000)">
                                        <polygon id="Shape" points="0 0 24 0 24 24 0 24" />
                                        <path d="M16.5,3 C14.76,3 13.09,3.81 12,5.09 C10.91,3.81 9.24,3 7.5,3 C4.42,3 2,5.42 2,8.5 C2,12.28 5.4,15.36 10.55,20.04 L12,21.35 L13.45,20.03 C18.6,15.36 22,12.28 22,8.5 C22,5.42 19.58,3 16.5,3 Z M12.1,18.55 L12,18.65 L11.9,18.55 C7.14,14.24 4,11.39 4,8.5 C4,6.5 5.5,5 7.5,5 C9.04,5 10.54,5.99 11.07,7.36 L12.94,7.36 C13.46,5.99 14.96,5 16.5,5 C18.5,5 20,6.5 20,8.5 C20,11.39 16.86,14.24 12.1,18.55 Z" id="Shape" fill="#F2706D" fillRule="nonzero" />
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                    <span className="font-weight-normal align-top">18</span>
                </div>
            </span>

            <h4 className="card-title font-weight-normal mt-3">
                SmashingConf New York 2017
            </h4>
            <p className="card-text">
                With 1 track, 2 full conference days, 10 workshops, 15 excellent
                speakers and just 400 available seats - tickets will go fast!
            </p>

            <div className="d-flex justify-content-end">
                <span className="badge badge-pill badge-light mr-2">javascript</span>
                <span className="badge badge-pill badge-light mr-2">css</span>
                <span className="badge badge-pill badge-light">web</span>
            </div>

        </div>
    </div>
);


export default card;
