import API from 'data/api';

import User from './user';

class Actions {
    constructor(env) {
        this.dispatch = (env.props || {}).dispatch || env.dispatch;

        this.api = new API();

        this.user = new User(this);
    }
}

export default Actions;