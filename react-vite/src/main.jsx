import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import configureStore from "./redux/store";
import { router } from "./router";
import { ToastContainer } from "react-toastify";
import * as sessionActions from "./redux/session";
import './normalize.css';
import "./index.css";

const store = configureStore();

if (import.meta.env.MODE !== "production") {
    window.store = store;
    window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <RouterProvider router={router} />
            <ToastContainer
                theme="dark"
                pauseOnHover
                pauseOnFocusLoss
                draggable
                limit={3}
            />
        </ReduxProvider>
    </React.StrictMode>
);
