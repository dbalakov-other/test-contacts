import React from 'react';

import ContactItem from 'components/contact-item';
import './styles.less';

class ContactItems extends React.Component {
    render() {
        const { items } = this.props;

        return (
            <div className="app-contact-items">
                {items.map((item, index)=> (
                    <ContactItem
                        key={item.id || item._id}
                        item={item}
                        onSave={(i)=>(this.onSave(i))}
                        onCancel={()=>(this.onCancel(item, index))}
                        onDelete={()=>(this.onDelete(item, index))}
                        />
                ))}
            </div>
        );
    }

    onSave(item) {
        const { onSave } = this.props;
        return onSave(item);
    }

    onCancel(item, index) {
        const { onCancel } = this.props;
        return onCancel(item, index);
    }

    onDelete(item, index) {
        const { onDelete } = this.props;
        return onDelete(item, index);
    }
}

export default ContactItems;