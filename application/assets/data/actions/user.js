class User {
    static ACTIONS = {
        SET_DATA: 'USER.SET_DATA'
    };

    constructor(actions) {
        this.actions = actions;
    }

    start() {
        this.setData({ state: 'started' });
    }

    signIn(data) {
        this.actions.dispatch((dispatch, getState)=> {
            const { user } = getState();
            if (user.inProgress) { return; }

            this.setData({ inProgress: true, error: null });
            this.actions.api.users.signIn(data).then((result)=> {
                console.log('SIGN IN OK', result);
            }).catch((e)=> {
                this.setError(SERVER_ERRORS[e.message] || API_ERROR);
            }).then(()=> {
                this.setData({ inProgress: false });
            });
        });
    }

    signUp(data) {
        this.actions.dispatch((dispatch, getState)=> {
            const { user } = getState();
            if (user.inProgress) { return; }

            this.setData({ inProgress: true, error: null });
            this.actions.api.users.signUp(data).then((result)=> {
                console.log('SIGN UP OK', result);
            }).catch((e)=> {
                this.setError(SERVER_ERRORS[e.message] || API_ERROR);
            }).then(()=> {
                this.setData({ inProgress: false });
            });
        });
    }

    setError(error) {
        this.setData({ error });
    }

    setData(data) {
        this.actions.dispatch({ type: User.ACTIONS.SET_DATA, data });
    }
}

const API_ERROR = 'Что-то пошло не так. Повторите попытку чуть позже.';
const SERVER_ERRORS = {
    'Email already exists': 'Email уже используется',
    'Invalid email or password': 'Проверьте введенные данные'
};

export default User;