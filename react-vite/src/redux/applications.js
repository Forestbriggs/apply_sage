const SET_APPLICATIONS = 'applications/setApplications';
const SET_APPLICATION = 'applications/setApplication';

const setApplications = (applications) => ({
    type: SET_APPLICATIONS,
    payload: applications
});

const setApplication = (application) => ({
    type: SET_APPLICATION,
    payload: application
})

export const thunkGetUserApplications = () => async (dispatch) => {
    const response = await fetch('/api/applications');
    if (response.ok) {
        const data = await response.json();
        dispatch(setApplications(data));
    } else if (response.status < 500) {
        const errors = await response.json();
        return errors;
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
};

export const thunkGetUserDashboard = () => async (dispatch) => {
    const response = await fetch('/api/applications/dashboard');
    if (response.ok) {
        const data = await response.json();
        dispatch(setApplications(data));
    } else if (response.status < 500) {
        const errors = await response.json();
        return errors;
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
}

export const thunkGetApplicationById = (application_id) => async (dispatch) => {
    const response = await fetch(`/api/applications/${application_id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setApplication(data));
    } else if (response.status < 500) {
        const errors = await response.json();
        return errors;
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
}

export const thunkCreateApplication = (payload) => async (dispatch) => {
    const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setApplication(data));
        return data.id;
    } else if (response.status < 500) {
        const errors = await response.json();
        throw errors;
    } else {
        return { server: 'Something went wrong. Please try again' }
    }
}

const initialState = { data: {}, allIds: [] };

function applicationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_APPLICATIONS: {
            const newState = structuredClone(initialState);
            action.payload.Applications.forEach(application => {
                newState.data[application.id] = application;
                if (newState.allIds.indexOf(application.id) < 0) {
                    newState.allIds.push(application.id)
                }
            })
            return newState;
        }

        case SET_APPLICATION: {
            const newState = structuredClone(state);
            const application = action.payload;
            newState.data[application.id] = application
            if (newState.allIds.indexOf(application.id) < 0) {
                newState.allIds.push(application.id)
            }
            return newState;
        }

        default:
            return state;
    }
}

export default applicationReducer;