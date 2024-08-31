import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function Layout(): JSX.Element {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
    }, [dispatch]);

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
