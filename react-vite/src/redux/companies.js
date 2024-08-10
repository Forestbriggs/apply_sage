const SET_COMPANIES = 'companies/setCompanies';
const SET_COMPANY = 'companies/setCompany';

const setCompanies = (companies) => ({
    type: SET_COMPANIES,
    payload: companies
});

const setCompany = (company) => ({
    type: SET_COMPANY,
    payload: company
});

export const thunkGetUserCompanies = () => async (dispatch) => {
    const response = await fetch('/api/companies');
    if (response.ok) {
        const data = await response.json();
        dispatch(setCompanies(data));
    } else if (response.status < 500) {
        const errors = await response.json();
        return errors;
    } else {
        return { server: 'Something went wrong. Please try again' }
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

        default:
            return state;
    }
}

export default companyReducer;