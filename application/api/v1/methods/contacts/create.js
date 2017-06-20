export default ({ name, surname }, env)=> {
    return env.user().then((user)=> {
        env.dao.main.contacts.create({ user: user.id, name, surname });

        return env.dao.main.execute().then((result)=> {
            const { id } = result[0].rows[0];
            return { id, name, surname };
        });
    });
};