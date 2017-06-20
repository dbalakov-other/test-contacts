export default ({ contact, type, text }, env)=> {
    return env.user().then((user)=> {
        return env.dao.main.contacts.selectOne({ id: contact, user: user.id }).then((result)=> {
            if (result == null) { throw new env.ApiError(400, 'Invalid contact'); }

            env.dao.main.contactItems.create({ contact, type, text });

            return env.dao.main.execute().then((result)=> {
                const { id } = result[0].rows[0];
                return { id, contact, type, text };
            });
        });
    });
};