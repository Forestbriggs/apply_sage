import axios from "axios";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER
});

export const thunkAuthenticate = () => async (dispatch) => {
    try {
        const response = await axios.get("/api/auth/");
        const data = response.data;
        dispatch(setUser(data));
    } catch (errors) {
        return;
    }
};

export const thunkLogin = (credentials) => async dispatch => {
    try {
        const response = await axios.post("/api/auth/login", credentials);
        const data = response.data;
        dispatch(setUser(data));
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { server: "Something went wrong. Please try again" }
        }
    }
};

export const thunkSignup = (user) => async (dispatch) => {
    try {
        const response = await axios.post("/api/auth/signup", user);
        const data = response.data;
        dispatch(setUser(data));
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { server: "Something went wrong. Please try again" }
        }
    }
};

export const thunkLogout = () => async (dispatch) => {
    await axios.get("/api/auth/logout");
    dispatch(removeUser());
};

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case REMOVE_USER:
            return { ...state, user: null };
        default:
            return state;
    }
}

export default sessionReducer;
