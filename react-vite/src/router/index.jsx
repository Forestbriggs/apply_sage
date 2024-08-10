import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from '../components/LandingPage/LandingPage';
import ErrorPage from '../components/ErrorPage';
import ApplicationList from '../components/ApplicationList/ApplicationList';
import ApplicationDetails from '../components/ApplicationDetails';
import CompanyList from '../components/CompanyList';
import CompanyForm from '../components/CompanyForm/CompanyForm';

// TODO site wide validate user on all login required pages
// TODO redirect if not logged in OR if logging out


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
                path: 'companies',
                children: [
                    {
                        index: true,
                        element: <CompanyList />
                    },
                    {
                        path: 'select',
                        element: <CompanyForm />
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