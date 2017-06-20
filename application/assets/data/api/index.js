import Users from './users';
import Contacts from './contacts';
import ContactItems from './contact-items';

class API {
    constructor() {
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        
        this.events = {};
        this.users = new Users(this);
        this.contacts = new Contacts(this);
        this.contactItems = new ContactItems(this);
    }
    
    fetch(url, props, token) {
        const { headers } = this;

        return fetch(url, { headers: { ...headers, Authorization: token }, ...props }).then((result)=>(
            result.json()
        )).then((result)=> {
            if (result.error == INVALID_TOKEN) { this.emit('tokenChanged', null); }
            if (result.error) { throw new Error(result.error); }

            return result;
        });
    }
    
    on(event, handler) {
        this.events[event] = this.events[event] || [];
        this.events[event].push(handler);
    }
    
    emit(event, data) {
        (this.events[event] || []).forEach((handler)=>(handler(data)));
    }
}

const INVALID_TOKEN = 'Invalid token';

export default API;