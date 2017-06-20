class User {
    static ACTIONS = {
        SET_DATA: 'USER.SET_DATA'
    };

    constructor(actions) {
        this.actions = actions;
    }

    start() {
        const token = this.actions.getLocalStorageValue('token');
        
        this.setData({ state: 'started', token });
    }

    signIn(data) {
        this.actions.dispatch((dispatch, getState)=> {
            const { user } = getState();
            if (user.inProgress) { return; }

            this.setData({ inProgress: true, error: null });
            this.actions.api.users.signIn(data).catch((e)=> {
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
            this.actions.api.users.signUp(data).catch((e)=> {
                this.setError(SERVER_ERRORS[e.message] || API_ERROR);
            }).then(()=> {
                this.setData({ inProgress: false });
            });
        });
    }

    signOut() {
        this.setToken();
    }

    setError(error) {
        this.setData({ error });
    }

    setToken(token) {
        this.actions.setLocalStorageValue('token', token);

        this.setData({ token });
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