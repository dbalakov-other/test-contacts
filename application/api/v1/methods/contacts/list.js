export default ({ offset, limit, q }, env)=> {
    return env.user().then((user)=> {
        return env.dao.main.contacts.selectWithItems({ user: user.id, q }, { offset, limit, order: '"surname", "name"' });
    }).then((contacts)=>(
        {
            contacts,
            success: true
        }
    ));
};