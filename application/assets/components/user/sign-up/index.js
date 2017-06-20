import React from 'react';

class SignUp extends React.Component {
    render() {
        const { error, inProgress } = this.props;

        const disabled = inProgress ? { disabled: 'disabled' } : {};
        return (
            <div className="app-user-modal">
                <div className="app-user-modal-header">Регистрация</div>
                <div className="app-user-modal-form">
                    {error ? (<label className="control-label text-danger">{error}</label>) : null}
                    <div className="input-group">
                        <input {...disabled} ref="name" type="text" className="form-control" placeholder="Имя" />
                    </div>
                    <div className="input-group">
                        <input {...disabled} ref="surname" type="text" className="form-control" placeholder="Фамилия" />
                    </div>
                    <div className="input-group">
                        <input {...disabled} ref="email" type="text" className="form-control" placeholder="Email" />
                    </div>
                    <div className="input-group">
                        <input {...disabled} ref="password" type="password" className="form-control" placeholder="Пароль" />
                    </div>
                    <div className="input-group">
                        <input {...disabled} ref="confirmPassword" type="password" className="form-control" placeholder="Подтверждение пароля" />
                    </div>
                </div>
                <div className="app-user-modal-actions">
                    <div>
                        <button {...disabled} type="button" className="btn btn-success" onClick={()=>(this.onSignIn())}>Вход</button>
                    </div>
                    <div style={{ flex: 1 }} />
                    <div>
                        <button {...disabled} type="button" className="btn btn-primary" onClick={()=>(this.onSignUp())}>Зарегистрироваться</button>
                    </div>
                </div>
            </div>
        );
    }

    onSignIn() {
        const { onSignIn } = this.props;
        onSignIn && onSignIn();
    }

    onSignUp() {
        const { name, surname, email, password } = this.refs;
        const { onSignUp } = this.props;

        if (!this.check()) { return; }

        onSignUp && onSignUp({
            name: name.value,
            surname: surname.value,
            email: email.value,
            password: password.value
        });
    }

    check() {
        const { onSetError } = this.props;
        const { name, surname, email, password, confirmPassword } = this.refs;

        if ((name.value || '').trim()  == '') {
            name.focus();
            onSetError && onSetError('Введите имя');
            return false;
        }
        if ((surname.value || '').trim()  == '') {
            surname.focus();
            onSetError && onSetError('Введите фамилию');
            return false;
        }
        if (!EMAIL_REGEXP.test(email.value)) {
            email.focus();
            onSetError && onSetError('Введите email');
            return false;
        }
        if ((password.value || '').length < 6) {
            password.focus();
            onSetError && onSetError('Пароль не может быть короче 6 символов');
            return false;
        }
        if (password.value != confirmPassword.value) {
            confirmPassword.focus();
            onSetError && onSetError('Пароли не совпадают');
            return false;
        }

        onSetError && onSetError(null);
        return true;
    }
}

const EMAIL_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/;

export default SignUp;