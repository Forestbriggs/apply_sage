import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from '../components/LandingPage/LandingPage';
import ErrorPage from '../components/ErrorPage';
import ApplicationList from '../components/ApplicationList/ApplicationList';
import ApplicationDetails from '../components/ApplicationDetails';

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: 'applications',
                children: [
                    {
                        index: true,
                        element: <ApplicationList />
                    },
                    {
                        path: ':applicationId',
                        element: <ApplicationDetails />
                    }
                ]
            },
            {
                path: "*",
                element: <ErrorPage />,
            }
        ],
    },
]);