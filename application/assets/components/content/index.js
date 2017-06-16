import React from 'react';
import { connect } from 'react-redux';

import Icons from 'components/icons';
import User from 'components/user';

import './styles.less';

class Content extends React.Component {
    render() {
        const { user } = this.props;
        if (user.state !== 'started') { return this.renderLoading(); }
        if (user.actual == null) { return this.renderUser(); }

        return (
            <div>
                {JSON.stringify(user)}
            </div>
        );
    }

    renderLoading() {
        return (
            <div className="app-loading">
                <Icons.Loading width="128px" height="128px" />
            </div>
        );
    }

    renderUser() {
        return (<User />);
    }
}

export default connect(({ user })=>({ user }))(Content);