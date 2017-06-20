class Contacts {
    static ACTIONS = {
        SET_DATA: 'CONTACTS.SET_DATA',
        SET_ITEM_DATA: 'CONTACTS.SET_ITEM_DATA',
        APPEND_ITEMS: 'CONTACTS.APPEND_ITEMS',
        UNSHIFT: 'CONTACTS.UNSHIFT',
        PUSH_ITEM: 'CONTACTS.PUSH_ITEM',
        DELETE: 'CONTACTS.DELETE',
        DELETE_ITEM: 'CONTACTS.DELETE_ITEM'
    };

    constructor(actions) {
        this.actions = actions;
    }
    
    load(q, offset, ignoreDebounce) {
        if (ignoreDebounce) {
            return this.actions.dispatch((dispatch, getState)=> {
                const { contacts, user } = getState();
                if (contacts.q != q) { return; }

                this.setData({ inProgress: true });
                return this.actions.api.contacts.search(user.token, q, { offset, limit: LIMIT }).then((items)=> {
                    this.setData({ items, canLoadMore: true });
                }).catch(()=> {
                    this.setError(API_ERROR);
                }).then(()=> {
                    this.setData({ inProgress: false });
                });
            });
        }

        setTimeout(()=>(this.load(q, offset, true)), DEBOUNCE);
    }
    
    loadMore() {
        return this.actions.dispatch((dispatch, getState)=> {
            const { contacts, user } = getState();
            const { q, inProgress, canLoadMore } = contacts;
            const offset = (contacts.items || []).length;
            
            if (inProgress || !canLoadMore) { return; }

            this.setData({ inProgress: true });
            return this.actions.api.contacts.search(user.token, q, { offset, limit: LIMIT }).then((items)=> {
                const { contacts } = getState();
                if (contacts.q != q || contacts.items.length != offset) { return; }

                this.actions.dispatch({ type: Contacts.ACTIONS.APPEND_ITEMS, items });
            }).catch(()=> {
                this.setError(API_ERROR);
            }).then(()=> {
                this.setData({ inProgress: false });
            });
        });
    }

    setQ(q) {
        this.actions.dispatch((dispatch, getState)=> {
            const { contacts } = getState();
            if (contacts.q === q) { return; }

            this.setData({ q, items: [] });
            this.load(q, 0);
        });
    }

    open(index) {
        this.setItemData(index, { isOpened: true });
    }

    close(index) {
        this.setItemData(index, { isOpened: false });
    }

    setError(error) {
        this.setData({ error });
    }

    delete(id) {
        return new Promise((resolve, reject)=> {
            this.actions.dispatch((dispatch, getState)=> {
                const { user } = getState();
                
                this.actions.api.contacts.delete(user.token, id).then(()=> {
                    this.actions.dispatch({ type: Contacts.ACTIONS.DELETE, id });
                    resolve();
                }).catch((e)=>(
                    reject(e)
                ));
            });
        });
    }

    save({ id, name, surname }) {
        return new Promise((resolve, reject)=> {
            this.actions.dispatch((dispatch, getState)=> {
                const { user } = getState();

                this.actions.api.contacts[id == null ? 'insert' : 'update'](user.token, { id, name, surname }).then((result)=> {
                    if (id == null) { this.unshift(result); }

                    this.setItemData(id, { name, surname });
                    return result;
                }).then((result)=> (
                    resolve(result)
                )).catch((e)=>(
                    reject(e)
                ));
            });
        });
    }

    saveItem({ id, contact, type, text }) {
        return new Promise((resolve, reject)=> {
            this.actions.dispatch((dispatch, getState)=> {
                const { user } = getState();

                this.actions.api.contactItems[id == null ? 'insert' : 'update'](user.token, { id, contact, type, text }).then((result)=> {
                    this.pushContactItem(contact, result);

                    return result;
                }).then((result)=> (
                    resolve(result)
                )).catch((e)=>(
                    reject(e)
                ));
            });
        });
    }

    deleteItem(id) {
        return new Promise((resolve, reject)=> {
            this.actions.dispatch((dispatch, getState)=> {
                const { user } = getState();

                this.actions.api.contactItems.delete(user.token, id).then((result)=> {
                    this.deleteContactItem(id);
                    
                    return result;
                }).then((result)=> (
                    resolve(result)
                )).catch((e)=>(
                    reject(e)
                ));
            });
        });
    }

    pushContactItem(id, contact) {
        this.actions.dispatch({ type: Contacts.ACTIONS.PUSH_ITEM, id, contact });
    }
    
    deleteContactItem(id) {
        this.actions.dispatch({ type: Contacts.ACTIONS.DELETE_ITEM, id });
    }

    setData(data) {
        this.actions.dispatch({ type: Contacts.ACTIONS.SET_DATA, data });
    }

    setItemData(id, data) {
        this.actions.dispatch({ type: Contacts.ACTIONS.SET_ITEM_DATA, id, data });
    }

    unshift(item) {
        this.actions.dispatch({ type: Contacts.ACTIONS.UNSHIFT, item });
    }
}

const LIMIT = 25;
const DEBOUNCE = 300;
const API_ERROR = 'Что-то пошло не так. Повторите попытку чуть позже.';

export default Contacts;