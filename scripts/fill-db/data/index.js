import users from './users';
import contacts from './contacts';
import contactItems from './contact-items';

export default { users, contacts, contactItems: contactItems(contacts) };