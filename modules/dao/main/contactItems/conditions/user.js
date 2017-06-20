module.exports = (value, params)=> {
    if (value == null) { return; }

    return `(SELECT "user" FROM "Contacts" WHERE "Contacts"."id" = "ContactItems"."contact") = $${params.push(value)}`;
};