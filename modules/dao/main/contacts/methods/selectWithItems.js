import Zatanna from 'zatanna';

module.exports = function(conditions, options) {
    return this.select(conditions, { fields: FIELDS.slice(), ...options })
};

const FIELDS = [
    'id',
    'name',
    'surname',
    new Zatanna.Field.Array('SELECT * FROM "ContactItems" WHERE "ContactItems"."contact" = "Contacts"."id"', 'contacts')
];