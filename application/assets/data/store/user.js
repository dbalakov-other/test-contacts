import User from 'data/actions/user';

const initialState = {
    state: 'start'
};

export default (state = initialState, action = {})=> {
    let newState = { ...state };

    switch (action.type) {
        case User.ACTIONS.SET_DATA:
            newState = { ...state, ...action.data };
            break;
    }

    return newState;
};