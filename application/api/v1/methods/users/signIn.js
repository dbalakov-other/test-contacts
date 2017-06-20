export default ({ email, password }, env)=> {
    return env.dao.main.users.selectOne({ email }).then((user)=> {
        if (user == null) { throw new env.ApiError(400, { error: ERROR }); }

        env.data.user = user;
        return env.dao.main.users.compare(password, user.password);
    }).then((result)=> {
        if (!result) { return new env.ApiResponse(400, { error: ERROR }); }

        const { id, email ,name, surname } = env.data.user;
        return env.jwt.token({ user: { id, email ,name, surname } });
    }).then((token)=> (
        { token }
    ));
};

const ERROR = 'Invalid email or password';