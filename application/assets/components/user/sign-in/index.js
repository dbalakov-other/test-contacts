import React from 'react';

class SignIn extends React.Component {
    render() {
        const { error, inProgress } = this.props;
        const disabled = inProgress ? { disabled: 'disabled' } : {};

        return (
            <div className="app-user-modal">
                <div className="app-user-modal-header">Вход</div>
                <div className="app-user-modal-form">
                    {error ? (<label className="control-label text-danger">{error}</label>) : null}
                    <div className="input-group">
                        <input {...disabled} ref="email" type="text" className="form-control" placeholder="Email" />
                    </div>
                    <div className="input-group">
                        <input {...disabled} ref="password" type="password" className="form-control" placeholder="Пароль" />
                    </div>                    
                </div>
                <div className="app-user-modal-actions">
                    <div>
                        <button {...disabled} type="button" className="btn btn-success" onClick={()=>(this.onSignUp())}>Регистрация</button>
                    </div>
                    <div style={{ flex: 1 }} />
                    <div>
                        <button {...disabled} type="button" className="btn btn-primary" onClick={()=>(this.onSignIn())}>Войти</button>
                    </div>
                </div>
            </div>
        );
    }

    onSignUp() {
        const { onSignUp } = this.props;
        onSignUp && onSignUp();
    }

    onSignIn() {
        const { email, password } = this.refs;
        const { onSignIn } = this.props;
        
        if (!this.check()) { return; }

        onSignIn && onSignIn({
            email: email.value,
            password: password.value
        });
    }

    check() {
        const { onSetError } = this.props;
        const { email, password } = this.refs;

        if (!EMAIL_REGEXP.test(email.value)) {
            email.focus();
            onSetError && onSetError('Введите email');
            return false;
        }
        if ((password.value || '') == '') {
            password.focus();
            onSetError && onSetError('Введите пароль');
            return false;
        }

        onSetError && onSetError(null);
        return true;
    }
}

const EMAIL_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export default SignIn;