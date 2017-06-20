import jwt from 'jsonwebtoken';

class JWT {
    constructor(secret) {
        this.secret = secret;
    }

    token(data) {
        return new Promise((resolve, reject)=> {
            jwt.sign(data, this.secret, EXPIRES, (error, token)=> {
                if (error) { return reject(error); }

                resolve(token);
            });
        });
    }

    verify(token) {
        return new Promise((resolve, reject)=> {            
            jwt.verify(token, this.secret, (error, data)=> {
                if (error) { return reject(error); }

                resolve(data);
            })
        });
    }
}

const EXPIRES = { expiresIn: '1d' };

export default JWT;