import { JSX } from "react";
import { useEffect, useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function Layout(): JSX.Element {
    const dispatch = useAppDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    const authenticate = useCallback(async () => {
        await dispatch(thunkAuthenticate());
        setIsLoaded(true);
    }, [dispatch]);
    useEffect(() => {
        authenticate();
    }, [dispatch, authenticate]);

    return (
        <>
            <ModalProvider>
                <Navigation />
                <div className="min-h-main-container bg-main-alt sm:min-h-main-container-sm">
                    {isLoaded && <Outlet />}
                    <Modal />
                </div>
                <Footer />
            </ModalProvider>
        </>
    );
}
