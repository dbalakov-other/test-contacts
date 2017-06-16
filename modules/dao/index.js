import path from 'path';

import Zatanna from 'zatanna';

class DAO {
    constructor(config) {
        this.main = new Zatanna(config.main, path.join(__dirname, 'main'));
    }
}

export default DAO;