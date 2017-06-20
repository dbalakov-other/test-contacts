export default ({ id }, env)=> {
    return env.user().then((user)=> {
        env.dao.main.contactItems.delete({ user: user.id, contact: id });
        env.dao.main.contacts.delete({ user: user.id, id });

        return env.dao.main.execute().then(()=> ({ success: true }));
    });
};