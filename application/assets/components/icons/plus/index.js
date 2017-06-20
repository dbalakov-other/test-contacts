import React from 'react';

import props from '../props';

class Plus extends React.Component {
    render() {
        return (
            <svg {...props} {...this.props}>
                <path xmlns="http://www.w3.org/2000/svg" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                <path xmlns="http://www.w3.org/2000/svg" d="M0 0h24v24H0z" fill="none" />
            </svg>
        );
    }
}

export default Plus;