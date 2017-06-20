import Contacts from 'data/actions/contacts';

const initialState = {
    inProgress: false,
    items: []
};

export default (state = initialState, action = {})=> {
    let newState = { ...state, items: state.items.map((i)=>({ ...i })) };

    switch (action.type) {
        case Contacts.ACTIONS.SET_DATA:
            newState = { ...newState, ...action.data };
            break;

        case Contacts.ACTIONS.SET_ITEM_DATA:
            newState.items = newState.items.map((i)=> { 
                if (i.id != action.id) { return i; }

                return { ...i, ...action.data };
            });            
            break;
        
        case Contacts.ACTIONS.APPEND_ITEMS:
            newState.items = newState.items.concat(action.items);
            newState.canLoadMore = action.items.length != 0;
            break;

        case Contacts.ACTIONS.UNSHIFT:
            newState.items.unshift(action.item);
            break;

        case Contacts.ACTIONS.PUSH_ITEM:
            newState.items = newState.items.map((i)=> {
                if (i.id != action.id) { return i; }
                i.contacts = i.contacts || [];
                i.contacts.push(action.contact);

                return i;
            });
            break;

        case Contacts.ACTIONS.DELETE:
            newState.items = newState.items.filter((i)=> (i.id != action.id));
            break;

        case Contacts.ACTIONS.DELETE_ITEM:
            newState.items.forEach((i)=> (i.contacts = (i.contacts || []).filter((item)=> (item.id != action.id))));
            break;
    }

    return newState;
};