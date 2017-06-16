export default ({ email, name, surname, password }, env)=> {
    return env.dao.main.users.hidePassword(password).then((password)=> {
        env.dao.main.users.insert({ email, name, surname, password });
        
        return env.dao.main.execute(); 
    }).then(()=> {
        return new env.ApiResponse(201, { username: name });
    }).catch((e)=> {
        if (e.constraint == 'Users_email_key') {
            throw new env.ApiError(400, { error: 'Email already exists' });
        }
        
        throw e;
    });
};