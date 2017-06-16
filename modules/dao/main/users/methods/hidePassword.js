import bcrypt from 'bcrypt';

module.exports = (password)=> {
    return new Promise((resolve, reject)=> {
        bcrypt.hash(password, ROUNDS, (error, hash)=> (error ? reject(error) : resolve(hash)));
    });
};

const ROUNDS = 12;