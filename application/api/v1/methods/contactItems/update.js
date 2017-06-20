export default ({ id, type, text }, env)=> {
    return env.user().then((user)=> {
        env.dao.main.contactItems.update({ type, text }, { id, user: user.id });

        return env.dao.main.execute().then(()=> ({ success: true }));
    });
};