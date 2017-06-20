export default ({ id, name, surname }, env)=> {
    return env.user().then((user)=> {
        env.dao.main.contacts.update({ name, surname }, { user: user.id, id });

        return env.dao.main.execute().then(()=> {
            return { success: true };
        });
    });
};