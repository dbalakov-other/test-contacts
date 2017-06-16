class Users {
    constructor(api) {
        this.api = api;
    }

    signUp(data) {
        return this.api.fetch('/api/users', { method: 'POST', body: JSON.stringify(data) }).then(()=> (
            this.signIn({ email: data.email, password: data.password })
        ));
    }

    signIn(data) {
        return this.api.fetch('/api/login', { method: 'POST', body: JSON.stringify(data) });
    }
}

export default Users;