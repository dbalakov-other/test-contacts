import React from 'react';
import { connect } from 'react-redux';

import Actions from 'data/actions';
import Icons from 'components/icons';
import ContactItems from 'components/contact-items';
import './styles.less';

class EditDialog extends React.Component {
    componentWillMount() {
        this.actions = new Actions(this);
    }

    render() {
        const { data } = this.props;
        const { contact } = data;
        
        return (
            <div className="app-dialog-edit">
                <div className="app-dialog-edit-header">
                    <div className="app-dialog-edit-header-icon" onClick={()=>(this.onDelete())}>
                        <Icons.Cancel fill="#aa0000" />
                    </div>
                    <div className="app-dialog-edit-header-data">{`${contact.surname} ${contact.name}`}</div>
                    <div className="app-dialog-edit-header-icon" onClick={()=>(this.onSave())}>
                        <Icons.Save fill="#00aa00" />
                    </div>
                </div>
                <div className="app-dialog-edit-body">
                    <div className="app-dialog-edit-body-inputs">
                        <div className="input-group">
                            <input defaultValue={contact.surname} ref="surname" type="text" className="form-control" placeholder="Фамилия" />
                        </div>
                        <div className="input-group">
                            <input defaultValue={contact.name} ref="name" type="text" className="form-control" placeholder="Имя" />
                        </div>
                    </div>
                    {this.renderContacts()}
                </div>
            </div>
        );
    }

    renderContacts() {
        const { data } = this.props;
        const { contact } = data;

        if (contact.id == null) {
            return (
                <div className="app-dialog-edit-body-contacts-empty">
                    Сохраните, чтобы добавить контакты
                </div>
            );
        }

        return (
            <div className="app-dialog-edit-body-contacts">
                <div className="app-dialog-edit-body-contacts-header">
                    <button type="button" className="btn btn-primary" onClick={()=>(this.onAddContactItem())}>Добавить</button>
                </div>
                <div className="app-dialog-edit-body-contacts-body">
                    <ContactItems
                        items={contact.contacts}
                        onDelete={(item, index)=>(this.onDeleteItem(item, index))}
                        onSave={(i)=>(this.onSaveItem(i))}
                        />
                </div>
            </div>
        );
    }

    onDelete() {
        const { data } = this.props;
        const { contact } = data;
        const { id } = contact;

        if (id == null) { return this.actions.dialogs.close(); }

        this.actions.contacts.delete(id).then(()=> (this.actions.dialogs.close()));
    }

    onSave() {
        const { data } = this.props;
        const { contact } = data;
        const { id } = contact;
        const { name, surname } = this.refs;

        this.actions.contacts.save({ id, name: name.value, surname: surname.value }).then((result)=> {
            if (id == null) {
                const newData = { contact: { id: result.id, contacts: [], name: name.value, surname: surname.value } };
                return this.actions.dialogs.updateData(newData);
            }

            const newData = { contact: { name: name.value, surname: surname.value } };
            return this.actions.dialogs.updateData(newData);
        });
    }

    onAddContactItem() {
        const { data } = this.props;
        const { contact } = data;
        const { contacts } = contact;

        contacts.push({ name: '', surname: '', _id: Date.now() });

        this.actions.dialogs.updateData({ contact: { contacts } });
    }

    onDeleteItem(item, index) {
        const { data } = this.props;
        const { contact } = data;
        const { contacts } = contact;

        contacts.splice(index, 1);
        this.actions.dialogs.updateData({ contact: { contacts } });

        if (item.id != null) { this.actions.contacts.deleteItem(item.id); }
    }

    onSaveItem(item) {
        const { data } = this.props;
        const { contact } = data;
        return this.actions.contacts.saveItem({ ...item, contact: contact.id }).then((result)=> {
            const { data } = this.props;
            const { contact } = data;
            const { contacts } = contact;

            contacts.forEach((i)=> {
                if (i.id != item.id && (i.id != null || i._id != item._id)) { return; }

                i.id = result.id || i.id;
                i.type = item.type;
                i.text = item.text;
            });

            return this.actions.dialogs.updateData({ contact: { contacts } });
        });
    }
}

export default connect(({})=>({}))(EditDialog);