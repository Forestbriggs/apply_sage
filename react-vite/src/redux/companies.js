import axios from "axios";

const SET_COMPANIES = 'companies/setCompanies';
const SET_COMPANY = 'companies/setCompany';
const REMOVE_COMPANY = 'companies/removeCompany'

const setCompanies = (companies) => ({
    type: SET_COMPANIES,
    payload: companies
});

const setCompany = (company) => ({
    type: SET_COMPANY,
    payload: company
});

const removeCompany = (companyId) => ({
    type: REMOVE_COMPANY,
    payload: companyId
});

export const thunkGetUserCompanies = () => async (dispatch) => {
    try {
        const response = await axios.get('/api/companies');
        const data = response.data
        dispatch(setCompanies(data));
        return data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { server: 'Something went wrong. Please try again' }
        }
    }
}

export const thunkGetCompanyById = (company_id) => async (dispatch) => {
    try {

        const response = await axios.get(`/api/companies/${company_id}`);
        const data = response.data;
        dispatch(setCompany(data));
        return data;
    } catch (error) {
        if (error.response) {
            throw error.response.data
        } else {
            throw { server: 'Something went wrong. Please try again' }
        }
    }
}

export const thunkCreateCompany = (payload) => async (dispatch) => {
    try {
        const response = await axios.post('/api/companies', payload,);
        if (response.status >= 200 && response.status < 300) {
            const data = response.data
            dispatch(setCompany(data));
            return data.id;
        }
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { server: 'Something went wrong. Please try again' }
        }
    }
}

export const thunkEditCompany = (companyId, payload) => async (dispatch) => {
    try {

        const response = await axios.put(`/api/companies/${companyId}`, payload);
        const data = response.data;
        dispatch(setCompany(data));
        return data.id;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { server: 'Something went wrong. Please try again' }
        }
    }
}

export const thunkDeleteCompanyById = (companyId) => async (dispatch) => {
    try {
        const response = await axios.delete(`/api/companies/${companyId}`);
        const data = response.data;
        dispatch(removeCompany(companyId));
        return data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { server: 'Something went wrong. Please try again' }
        }
    }
}


const initialState = { data: {}, allIds: [] }

function companyReducer(state = initialState, action) {
    switch (action.type) {
        case SET_COMPANIES: {
            const newState = structuredClone(initialState);
            action.payload.Companies.forEach(company => {
                newState.data[company.id] = company;
                if (newState.allIds.indexOf(company.id) < 0) {
                    newState.allIds.push(company.id)
                }
            })
            return newState;
        }

        case SET_COMPANY: {
            const newState = structuredClone(state);
            const company = action.payload;
            newState.data[company.id] = company;
            if (newState.allIds.indexOf(company.id) < 0) {
                newState.allIds.push(company.id)
            }
            return newState;
        }

        case REMOVE_COMPANY: {
            const newState = structuredClone(state);
            const companyId = action.payload;
            if (newState.data[companyId]) {
                delete newState.data[companyId];
            }
            if (newState.allIds.indexOf(companyId) > -1) {
                newState.allIds.splice(newState.allIds.indexOf(companyId), 1)
            }
            return newState;
        }

        default:
            return state;
    }
}

export default companyReducer;