import axios from 'axios';
const SET_APPLICATIONS = 'applications/setApplications';
const SET_APPLICATION = 'applications/setApplication';
const REMOVE_APPLICATION = 'applications/removeApplication';

const setApplications = (applications) => ({
    type: SET_APPLICATIONS,
    payload: applications
});

const setApplication = (application) => ({
    type: SET_APPLICATION,
    payload: application
})

const removeApplication = (applicationId) => ({
    type: REMOVE_APPLICATION,
    payload: applicationId
})

export const thunkGetUserApplications = (page, perPage) => async (dispatch) => {
    try {
        const response = await axios.get(`/api/applications?page=${page}&per_page=${perPage}`);
        const data = response.data;
        dispatch(setApplications(data));
        return data;
    } catch (error) {
        if (error.response) {
            throw error.response
        } else {
            throw { server: 'Something went wrong. Please try again' }
        }
    }
};

export const thunkGetUserDashboard = () => async (dispatch) => {
    try {
        const response = await axios.get('/api/applications/dashboard');
        const data = response.data;
        dispatch(setApplications(data));
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { server: 'Something went wrong. Please try again' }
        }
    }
}

export const thunkGetApplicationById = (application_id) => async (dispatch) => {
    try {
        const response = await axios.get(`/api/applications/${application_id}`);
        const data = response.data;
        dispatch(setApplication(data));
        return data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { server: 'Something went wrong. Please try again' }
        }
    }
}

export const thunkCreateApplication = (payload) => async (dispatch) => {
    try {
        const response = await axios.post('/api/applications', payload);
        const data = response.data;
        dispatch(setApplication(data));
        return data.id;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { server: 'Something went wrong. Please try again' }
        }
    }
}

export const thunkEditApplication = (applicationId, payload) => async (dispatch) => {
    try {
        const response = await axios.put(`/api/applications/${applicationId}`, payload);
        const data = response.data;
        dispatch(setApplication(data));
        return data.id;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { server: 'Something went wrong. Please try again' }
        }
    }
}

export const thunkDeleteApplicationById = (applicationId) => async (dispatch) => {
    try {
        const response = await axios.delete(`/api/applications/${applicationId}`);
        const data = response.data;
        dispatch(removeApplication(applicationId));
        return data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { server: 'Something went wrong. Please try again' }
        }
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

        case REMOVE_APPLICATION: {
            const newState = structuredClone(state);
            const applicationId = action.payload;
            if (newState.data[applicationId]) {
                delete newState.data[applicationId];
            }
            if (newState.allIds.indexOf(applicationId) > -1) {
                newState.allIds.splice(newState.allIds.indexOf(applicationId), 1)
            }
            return newState;
        }

        default:
            return state;
    }
}

export default applicationReducer;