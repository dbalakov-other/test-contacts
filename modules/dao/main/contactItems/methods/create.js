module.exports = function({ contact, type, text }) {
    this.dao.executeSql(SQL, [ contact, type, text ]);
};

const SQL = 'INSERT INTO "ContactItems" ("contact", "type", "text") VALUES ($1, $2, $3) RETURNING "id"';