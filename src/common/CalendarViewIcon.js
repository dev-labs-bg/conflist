import React from 'react';
import PropTypes from 'prop-types';

const CalendarViewIcon = (props) => {
    /**
     * Chooses icon color based on the received props -
     * isAuthenticated and activeView
     * @return {string}
     */
    const changeIconColor = () => {
        if (props.isAuthenticated) {
            if (props.activeView === 'CALENDAR') {
                return '#FFFFFF';
            }
            return '#FFB2B3';
        }

        if (props.activeView === 'CALENDAR') {
            return '#f2706d';
        }
        return '#919193';
    };

    const handleToggleClick = () => {
        props.onClick();
    };

    return (
        <svg
            style={{ cursor: 'pointer' }}
            onClick={handleToggleClick}
            width="19px"
            height="18px"
            viewBox="0 0 19 18"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="conflist-wanna-go-list" transform="translate(-344.000000, -112.000000)">
                    <g id="Group" transform="translate(0.000000, 100.000000)">
                        <g id="calendar-view" transform="translate(344.000000, 12.000000)">
                            <rect id="Rectangle-5" stroke={changeIconColor()} strokeWidth="1.5" x="0.75" y="1.04998779" width="17.5" height="15.5" rx="2" />
                            <rect id="Rectangle-path" fill={changeIconColor()} fillRule="nonzero" x="4.15625" y="5.125" width="2.375" height="1.78125" />
                            <rect id="Rectangle-path" fill={changeIconColor()} fillRule="nonzero" x="4.15625" y="8.09375" width="2.375" height="1.78125" />
                            <rect id="Rectangle-path" fill={changeIconColor()} fillRule="nonzero" x="4.15625" y="11.0625" width="2.375" height="1.78125" />
                            <rect id="Rectangle-path" fill={changeIconColor()} fillRule="nonzero" x="8.3125" y="11.0625" width="2.375" height="1.78125" />
                            <rect id="Rectangle-path" fill={changeIconColor()} fillRule="nonzero" x="8.3125" y="8.09375" width="2.375" height="1.78125" />
                            <rect id="Rectangle-path" fill={changeIconColor()} fillRule="nonzero" x="8.3125" y="5.125" width="2.375" height="1.78125" />
                            <rect id="Rectangle-path" fill={changeIconColor()} fillRule="nonzero" x="12.46875" y="11.0625" width="2.375" height="1.78125" />
                            <rect id="Rectangle-path" fill={changeIconColor()} fillRule="nonzero" x="12.46875" y="8.09375" width="2.375" height="1.78125" />
                            <rect id="Rectangle-path" fill={changeIconColor()} fillRule="nonzero" x="12.46875" y="5.125" width="2.375" height="1.78125" />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};

CalendarViewIcon.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    activeView: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

CalendarViewIcon.defaultProps = {
    onClick: () => {},
};

export default CalendarViewIcon;
