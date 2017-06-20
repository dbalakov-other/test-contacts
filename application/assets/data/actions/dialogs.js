class Dialogs {
    static ACTIONS = {
        SET_DATA: 'DIALOGS.SET_DATA'
    };

    constructor(actions) {
        this.actions = actions;
    }
    
    open(dialog, data) {
        this.setData({ dialog, data });
    }

    close() {
        this.setData({ dialog: null, data: null });
    }

    updateData(data) {
        this.actions.dispatch((dispatch, getState)=> {
            const { dialogs } = getState();
            
            const newData = { ...(dialogs.data || {}) };
            Object.keys(data).forEach((key)=> {
                if (Array.isArray(data[key])) { return newData[key] = data[key].slice(); }
                
                newData[key] = { ...((dialogs.data || {})[key] || {}), ...data[key] };
            });

            this.setData({ data: newData });
        });
    }

    setData(data) {
        this.actions.dispatch({ type: Dialogs.ACTIONS.SET_DATA, data });
    }
}

export default Dialogs;