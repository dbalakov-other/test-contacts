import React from 'react';
import { connect } from 'react-redux';

import Icons from 'components/icons';
import Actions from 'data/actions';
import './styles.less';

class Contact extends React.Component {
    componentWillMount() {
        this.actions = new Actions(this);
    }

    render() {
        const { contact } = this.props;
        const { isOpened } = contact;

        return (
            <div className={`app-contact ${isOpened ? 'app-contact-opened' : ''}`.trim()}>
                <div className="app-contact-header" onClick={()=> (this.onOpenClose())}>
                    <div className="app-contact-header-icon-edit" onClick={(e)=> (this.onEdit(e))}>
                        <Icons.Edit />
                    </div>
                    {`${contact.surname} ${contact.name}`}
                    <div className="app-contact-header-icon">
                        {isOpened ? (<Icons.ArrowDropUp />) : (<Icons.ArrowDropDown />)}
                    </div>
                </div>
                {this.renderBody()}
            </div>
        );
    }

    renderBody() {
        const { contact } = this.props;
        const { isOpened } = contact;
        
        const contacts = (contact.contacts || []).filter((i)=>(i.id != null));
        if (isOpened) {
            return (
                <div className="app-contact-body-opened">
                    {contacts.map((item, index)=> (
                        <div key={index}>
                            {item.type}: <a onClick={()=>(this.onContactClick(item.text))}>{item.text}</a>
                        </div>
                    ))}
                </div>
            );
        }

        return (
            <div className="app-contact-body">
                {contacts.map((item, index)=> (
                    <div key={index}>
                        {item.type}: <a onClick={()=>(this.onContactClick(item.text))}>{item.text}</a>
                    </div>
                ))}
            </div>
        );
    }

    onContactClick(data) {
        this.actions.dialogs.open('contact', data);
    }

    onEdit(e) {
        e.stopPropagation();

        const { contact, index } = this.props;
        const data = { contact: { ...contact, contacts: (contact.contacts || []).slice() }, index };
        
        this.actions.dialogs.open('edit', data);
    }

    onOpenClose() {
        const { contact, index } = this.props;
        const { isOpened } = contact;

        this.actions.contacts[isOpened ? 'close' : 'open'](contact.id);
    }
}

export default connect(({})=>({}))(Contact);