import React from 'react';
import QRCode from 'qrcode';

import './styles.less';

class ContactDialog extends React.Component {
    componentDidMount() {
        const { canvas } = this.refs;
        const { data } = this.props;

        QRCode.toCanvas(canvas, data, ()=>{});
    }

    render() {
        const { data } = this.props;

        return (
            <div className="app-dialog-contact">
                <div className="app-dialog-contact-header">{data}</div>
                <div className="app-dialog-contact-body">
                    <canvas ref="canvas" />
                </div>
            </div>
        );
    }
}

export default ContactDialog;