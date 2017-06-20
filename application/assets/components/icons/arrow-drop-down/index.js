import React from 'react';

import props from '../props';

class ArrowDropDown extends React.Component {
    render() {
        return (
            <svg {...props} {...this.props}>
                <path xmlns="http://www.w3.org/2000/svg" d="M7 10l5 5 5-5z" />
                <path xmlns="http://www.w3.org/2000/svg" d="M0 0h24v24H0z" fill="none" />
            </svg>
        );
    }
}

export default ArrowDropDown;