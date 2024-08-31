import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
    combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import applicationReducer from "./applications";
import companyReducer from "./companies";

const rootReducer = combineReducers({
    session: sessionReducer,
    applications: applicationReducer,
    companies: companyReducer
});

// Fix for typescript error
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}
// Fix for typescript error
let enhancer;
if (import.meta.env.MODE === "production") {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = (await import("redux-logger")).default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState: any) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
