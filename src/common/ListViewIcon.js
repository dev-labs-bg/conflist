import React from 'react';

const ListViewIcon = (props) => {
    const renderIcon = () => {
        if (props.isAuthenticated) {
            if (props.isActive) {
                return '#FFFFFF';
            }
            return '#FFB2B3';
        }

        if (props.isActive) {
            return '#919193';
        }
        return '#f2706d';
    };

    const handleToggleClick = () => {
        props.onClick();
    }

    return (
        <svg style={{ cursor: 'pointer' }} onClick={handleToggleClick} width="19px" className="mr-2" height="18px" viewBox="0 0 19 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="conflist-wanna-go-list" transform="translate(-309.000000, -112.000000)">
                    <g id="Group" transform="translate(0.000000, 100.000000)">
                        <g id="list-view" transform="translate(309.000000, 12.000000)">
                            <rect id="Rectangle-5" stroke={renderIcon()} strokeWidth="1.5" x="0.75" y="1.04998779" width="17.5" height="15.5" rx="2"></rect>
                            <rect id="Rectangle-path" fill={renderIcon()} fillRule="nonzero" x="4.15625" y="8.09375" width="10.6999998" height="1.78125"></rect>
                            <rect id="Rectangle-path" fill={renderIcon()} fillRule="nonzero" x="4.15625" y="11.0625" width="10.6999998" height="1.78125"></rect>
                            <rect id="Rectangle-path" fill={renderIcon()} fillRule="nonzero" x="4.15625" y="5.125" width="10.6999998" height="1.78125"></rect>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}

export default ListViewIcon;
