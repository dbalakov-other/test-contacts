import Users from './users';

class API {
    constructor() {
        this.users = new Users(this);
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }
    
    fetch(url, props) {
        const { headers } = this;

        return fetch(url, { headers, ...props }).then((result)=>(
            result.json()
        )).then((result)=> {
            if (result.error) { throw new Error(result.error); }

            return result;
        });
    }
}

export default API;