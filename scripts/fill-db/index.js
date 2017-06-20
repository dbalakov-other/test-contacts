import Config from 'config';
import DAO from 'dao';

import data from './data';

const config = new Config();
const dao = new DAO(config.db);

dao.main.contactItems.delete();
dao.main.contacts.delete();
dao.main.users.delete();

dao.main.users.insertAll(data.users);
dao.main.contacts.insertAll(data.contacts);
dao.main.contactItems.insertAll(data.contactItems);

dao.main.executeSql(`ALTER SEQUENCE "Users_id_seq" RESTART WITH ${data.users.length}`);
dao.main.executeSql(`ALTER SEQUENCE "Contacts_id_seq" RESTART WITH ${data.contacts.length}`);
dao.main.executeSql(`ALTER SEQUENCE "ContactItems_id_seq" RESTART WITH ${data.contactItems.length}`);

dao.main.execute().then(()=> {
    console.log('All ok');
});

