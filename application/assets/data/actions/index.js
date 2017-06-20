import API from 'data/api';

import User from './user';
import Contacts from './contacts';
import Dialogs from './dialogs';

class Actions {
    constructor(env) {
        this.dispatch = (env.props || {}).dispatch || env.dispatch;

        this.api = new API();
        this.user = new User(this);
        this.contacts = new Contacts(this);
        this.dialogs = new Dialogs(this);

        this.apiSubscribes();
    }

    apiSubscribes() {
        this.api.on('tokenChanged', (token)=> (this.user.setToken(token)));
    }

    setLocalStorageValue(key, value) {
        if (value == null) { return localStorage.removeItem(key); }
        
        localStorage.setItem(key, value);
    }
    
    getLocalStorageValue(key) {
        return localStorage.getItem(key);
    }
}

export default Actions;