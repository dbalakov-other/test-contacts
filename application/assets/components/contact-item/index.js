import React from 'react';

import Icons from 'components/icons';
import './styles.less';

class ContactItem extends React.Component {
    componentWillMount() {
        this.setState({ view: 'view' });
    }

    componentDidMount() {
        const { type } = this.refs;
        if (type == null) { return; }

        type.focus();
    }

    render() {
        const { item } = this.props;
        let { view } = this.state;
        if (item.id == null) { view = 'edit'; }

        switch(view) {
            case 'view':
                return this.renderView();

            case 'edit':
                return this.renderEdit();
        }
    }

    renderView() {
        const { item } = this.props;

        return (
            <div className="app-contact-item">
                <div className="app-contact-item-text">{item.type}</div>
                <div className="app-contact-item-text">{item.text}</div>
                <div className="app-contact-item-icon" onClick={()=>(this.onEdit())}>
                    <Icons.Edit />
                </div>
            </div>
        );
    }

    renderEdit() {
        const { item } = this.props;

        return (
            <div className="app-contact-item">
                <div className="app-contact-item-icon">
                    <Icons.Cancel fill="#aa0000" onClick={()=>(this.onDelete())} />
                </div>
                <div className="app-contact-item-text">
                    <input ref="type" type="text" className="form-control" defaultValue={item.type} placeholder="Тип" />
                </div>
                <div className="app-contact-item-text">
                    <input ref="text" type="text" className="form-control" defaultValue={item.text} placeholder="Контакт" />
                </div>
                <div className="app-contact-item-icon">
                    <Icons.Save fill="#00aa00" onClick={()=>(this.onSave())} />
                </div>
                {this.renderCancelEdit()}
            </div>
        );
    }

    renderCancelEdit() {
        const { item } = this.props;
        if (item.id == null) { return; }

        return (
            <div className="app-contact-item-icon">
                <Icons.Close fill="#aa0000" onClick={()=>(this.onView())} />
            </div>
        );
    }

    onEdit() {
        this.setState({ view: 'edit' });
    }

    onView() {
        this.setState({ view: 'view' });
    }

    onDelete() {
        const { onDelete } = this.props;
        onDelete && onDelete();
    }

    onSave() {
        const { item, onSave } = this.props;
        const { type, text } = this.refs;

        if (type == null || text == null) { return; }

        const data = { ...item };
        data.type = type.value;
        data.text = text.value;

        this.onView()
        onSave && onSave(data).then((result)=> (item.id != null));
    }
}

export default ContactItem;