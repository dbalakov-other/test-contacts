import Dialogs from 'data/actions/dialogs';

const initialState = {
    dialog: null,
    data: null
};

export default (state = initialState, action = {})=> {
    let newState = { ...state };

    switch (action.type) {
        case Dialogs.ACTIONS.SET_DATA:
            newState = { ...state, ...action.data };
            break;
    }

    return newState;
};