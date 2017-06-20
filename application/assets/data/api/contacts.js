class Contacts {
    constructor(api) {
        this.api = api;
    }

    search(token, q, data) {
        const params = new URLSearchParams();
        params.append('q', q.toLowerCase());
        Object.keys(data || {}).forEach((key)=> (params.append(key, data[key])));

        return this.api.fetch(`/api/search?${params.toString()}`, { method: 'GET' }, token).then(({ contacts })=> (
            contacts
        ));
    }

    delete(token, id) {
        return this.api.fetch(`/api/contacts`, { method: 'DELETE', body: JSON.stringify({ id }) }, token);
    }

    update(token, { id, name, surname }) {
        return this.api.fetch(`/api/contacts`, { method: 'PUT', body: JSON.stringify({ id, name, surname }) }, token);
    }

    insert(token, { id, name, surname }) {
        return this.api.fetch(`/api/contacts`, { method: 'POST', body: JSON.stringify({ name, surname }) }, token);
    }
}

export default Contacts;