import React from 'react';
import { connect } from 'react-redux';

import Actions from 'data/actions';
import Icons from 'components/icons';
import Contact from 'components/contact';

import './styles.less';

class Contacts extends React.Component {
    componentWillMount() {
        this.actions = new Actions(this);

        this.actions.contacts.setQ('');
        window.addEventListener('scroll', this._onScroll = ()=>(this.onScroll()));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._onScroll);
    }

    render() {
        const { contacts } = this.props;
        const { q, items, inProgress } = contacts;

        return (
            <div className="app-contacts">
                <div className="app-contacts-header">
                    <div className="app-contacts-header-q">
                        <div className="input-group">
                            <input value={q || ''} onChange={(e)=>(this.onQChange(e))} type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="app-contacts-header-sign-out" onClick={()=>(this.onSignOut())}>
                        <Icons.SignOut />
                    </div>
                </div>
                <div className="app-contacts-list">
                    {(items || []).map((contact, index)=> (<Contact contact={contact} key={index} index={index} />))}
                    {inProgress ? (<Icons.Loading className="app-contacts-loading" width="64px" height="64px" />) : null }
                </div>
                <div className="app-contacts-main-action btn-success" onClick={()=>(this.onCreate())}>
                    <Icons.Plus fill="#FFFFFF" width="32px" height="32px" />
                </div>
            </div>
        );
    }

    onSignOut() {
        this.actions.user.signOut();
    }

    onQChange(e) {
        this.actions.contacts.setQ(e.target.value);
    }

    onCreate() {
        this.actions.dialogs.open('edit', { contact: { name: '', surname: '' } });
    }

    onScroll() {
        if (document.body.scrollTop + window.innerHeight + MORE_HEIGHT > document.body.scrollHeight) {
            this.actions.contacts.loadMore();
        }
    }
}

const MORE_HEIGHT = 100;

export default connect(({ contacts })=>({ contacts }))(Contacts);