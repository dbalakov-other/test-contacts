import React from 'react';
import { connect } from 'react-redux';

import Icons from 'components/icons';
import User from 'components/user';
import Contacts from 'components/contacts';
import Dialogs from 'components/dialogs';

import Actions from 'data/actions';
import './styles.less';

class Content extends React.Component {
    componentWillMount() {
        this.actions = new Actions(this);
    }

    render() {
        const { user } = this.props;
        if (user.state !== 'started') { return this.renderLoading(); }
        if (user.token == null) { return (<User />); }

        return (
            <div>
                <Contacts />
                {this.renderDialog()}
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
    
    renderDialog() {
        const { dialogs } = this.props;
        const { dialog, data } = dialogs;
        let DialogClass = null;

        switch(dialog) {
            case 'contact':
                DialogClass = Dialogs.Contact;
                break;

            case 'edit':
                DialogClass = Dialogs.Edit;
                break;
        }

        if (DialogClass == null) { return; }
        return (
            <div className="app-dialog-container">
                {this.renderDialogClose()}
                <DialogClass data={data} />
            </div>
        );
    }

    renderDialogClose() {
        const { dialogs } = this.props;
        const { data } = dialogs;

        if (data && data.inProgress) { return; }

        return (
            <div className="app-dialog-close" onClick={()=>(this.onCloseDialog())}>
                <Icons.Close fill="#ffffff" />
            </div>
        );
    }

    onCloseDialog() {
        this.actions.dialogs.close();
    }
}

export default connect(({ user, dialogs })=>({ user, dialogs }))(Content);