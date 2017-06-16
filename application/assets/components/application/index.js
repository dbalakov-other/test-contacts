import React from 'react';
import { Provider } from 'react-redux';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import store from 'data/store';
import Actions from 'data/actions';

import Content from 'components/content';

class Application extends React.Component {
    componentWillMount() {
        const actions = new Actions(store);
        actions.user.start();
    }

    render() {
        return (
            <Provider store={store}>
                <Content />
            </Provider>
        );
    }
}

export default Application;