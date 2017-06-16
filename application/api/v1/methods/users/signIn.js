export default ({ email, password }, env)=> {
    return env.dao.main.users.selectOne({ email }).then((user)=> {
        if (user == null) { return new env.ApiResponse(400, { error: ERROR }); }

        env.data.user = user;
        return env.dao.main.users.compare(password, user.password);
    }).then((result)=> {
        if (!result) { return new env.ApiResponse(400, { error: ERROR }); }

        const token = env.jwt.sign({ user: env.data.user }, env.config.application.jwt_secret, EXPIRES);
        return { token };
    });
};

const ERROR = 'Invalid email or password';
const EXPIRES = { expiresIn: '1d' };