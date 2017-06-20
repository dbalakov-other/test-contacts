export default ({ id }, env)=> {
    return env.user().then((user)=> {        
        env.dao.main.contactItems.delete({ id, user: user.id });

        return env.dao.main.execute().then(()=> ({ success: true }));
    });
};