import React from 'react';
import { connect } from 'react-redux';

import Actions from 'data/actions';

import SignIn from './sign-in';
import SignUp from './sign-up';
import './styles.less';

class User extends React.Component {
    componentWillMount() {
        this.state = { page: 'sign-in' };
        this.actions = new Actions(this);
    }

    render() {
        const { page } = this.state;
        const { user } = this.props;
        const { error, inProgress } = user;

        const props = { error, inProgress, onSetError: (error)=>(this.onSetError(error)) };
        if (page == 'sign-in') {
            return (
                <div className="app-user-form-container">
                    <SignIn
                        {...props}
                        onSignIn={(data)=>(this.onSignIn(data))}
                        onSignUp={()=>(this.onSetPage('sign-up'))}
                        />
                </div>
            );
        }

        return (
            <div className="app-user-form-container">
                <SignUp
                    {...props}
                    onSignUp={(data)=>(this.onSignUp(data))}
                    onSignIn={()=>(this.onSetPage('sign-in'))}
                    />
            </div>
        );
    }

    onSetPage(page) {
        this.actions.user.setError(null);
        this.setState({ page });
    }

    onSetError(error) {
        this.actions.user.setError(error);
    }

    onSignIn(data) {
        this.actions.user.signIn(data);
    }

    onSignUp(data) {
        this.actions.user.signUp(data);
    }
}

export default connect(({ user })=>({ user }))(User);