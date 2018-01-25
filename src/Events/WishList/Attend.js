import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PopoverItem from '../../common/PopoverItem';

class Attend extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            wannaGo: false,
        };
    }

    render() {
        //  if (this.state.wannaGo) {
        //     return (
        //         <div>
        //             <svg
        //                 width="20px"
        //                 height="19px"
        //                 viewBox="0 0 20 19"
        //                 version="1.1"
        //                 xmlns="http://www.w3.org/2000/svg"
        //                 xmlnsXlink="http://www.w3.org/1999/xlink"
        //             >
        //                 <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        //                     <g id="conflist-home-page-logged-in" transform="translate(-986.000000, -677.000000)">
        //                         <g id="conf-card" transform="translate(309.000000, 639.000000)">
        //                             <g id="ic_favorite_black_24px-(1)" transform="translate(675.000000, 35.000000)">
        //                                 <polygon id="Shape" points="0 0 24 0 24 24 0 24" />
        //                                 <path d="M12,21.35 L10.55,20.03 C5.4,15.36 2,12.28 2,8.5 C2,5.42 4.42,3 7.5,3 C9.24,3 10.91,3.81 12,5.09 C13.09,3.81 14.76,3 16.5,3 C19.58,3 22,5.42 22,8.5 C22,12.28 18.6,15.36 13.45,20.04 L12,21.35 Z" id="Shape" fill="#F2706D" fillRule="nonzero" />
        //                             </g>
        //                         </g>
        //                     </g>
        //                 </g>
        //             </svg>
        //         </div>
        //     );
        // }

        return (
            <div>
                <PopoverItem item={{ name: 'Wanna go' }} id={this.props.id} >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="20"
                        height="19"
                        viewBox="0 0 20 19"
                        onClick={() => this.setState({ wannaGo: true })}
                    >
                        <defs>
                            <path id="87eya" d="M1006 894.5c0 3.78-3.4 6.86-8.55 11.53l-1.45 1.32-1.45-1.31c-5.15-4.68-8.55-7.76-8.55-11.54 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09a5.99 5.99 0 0 1 4.5-2.09c3.08 0 5.5 2.42 5.5 5.5zm-2 0c0-2-1.5-3.5-3.5-3.5-1.54 0-3.04.99-3.56 2.36h-1.87a3.9 3.9 0 0 0-3.57-2.36c-2 0-3.5 1.5-3.5 3.5 0 2.89 3.14 5.74 7.9 10.05l.1.1.1-.1c4.76-4.31 7.9-7.16 7.9-10.05z" />
                        </defs>
                        <g>
                            <g transform="translate(-986 -889)">
                                <use
                                    fill="#f2706d"
                                    xlinkHref="#87eya"
                                />
                            </g>
                        </g>
                    </svg>
                </PopoverItem>
            </div>
        );
    }
}

export default Attend;
