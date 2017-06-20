class Contacts {
    constructor(api) {
        this.api = api;
    }

    delete(token, id) {
        console.log('T', token, id);
        return this.api.fetch(`/api/contact-items`, { method: 'DELETE', body: JSON.stringify({ id }) }, token);
    }

    update(token, { id, type, text }) {
        return this.api.fetch(`/api/contact-items`, { method: 'PUT', body: JSON.stringify({ id, type, text }) }, token);
    }

    insert(token, { contact, type, text }) {
        return this.api.fetch(`/api/contact-items`, { method: 'POST', body: JSON.stringify({ contact, type, text }) }, token);
    }
}

export default Contacts;