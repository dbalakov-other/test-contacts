module.exports = function({ user, name, surname }) {
    this.dao.executeSql(SQL, [ user, name, surname ]);
};

const SQL = 'INSERT INTO "Contacts" ("user", "name", "surname") VALUES ($1, $2, $3) RETURNING "id"';