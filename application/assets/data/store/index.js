import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import user from './user';
import contacts from './contacts';
import dialogs from './dialogs';

const store = createStore(
    combineReducers({        
        user,
        contacts,
        dialogs
    }),
    applyMiddleware(thunk)
);

export default store;