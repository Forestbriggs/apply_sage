import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from '../components/LandingPage/LandingPage';
import ErrorPage from '../components/ErrorPage';
import ApplicationList from '../components/ApplicationList/ApplicationList';
import ApplicationDetails from '../components/ApplicationDetails';
import NewApplicationForm from '../components/ApplicationForm/NewApplicationForm';
import EditApplicationForm from '../components/ApplicationForm/EditApplicationForm';
import CompanyList from '../components/CompanyList';
import CompanyForm from '../components/CompanyForm/CompanyForm';
import EditCompanyForm from '../components/CompanyForm/EditCompanyForm';
import Unauthorized from '../components/Unauthorized/Unauthorized';

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
                        children: [
                            {
                                index: true,
                                element: <ApplicationDetails tab='overview' />,
                            },
                            {
                                path: 'notes-and-reminders',
                                element: <ApplicationDetails tab='notes-and-reminders' />
                            },
                            {
                                path: 'documents',
                                element: <ApplicationDetails tab='documents' />
                            },
                            {
                                path: 'edit',
                                element: <EditApplicationForm />
                            }
                        ]
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
                    },
                    {
                        path: ':companyId',
                        children: [
                            {
                                index: true,
                                element: <ErrorPage />
                            },
                            {
                                path: 'applications/create',
                                element: <NewApplicationForm />
                            },
                            {
                                path: 'edit',
                                element: <EditCompanyForm />
                            }
                        ]
                    }
                ]
            },
            {
                path: "unauthorized",
                element: <Unauthorized />,
            },
            {
                path: "*",
                element: <ErrorPage />,
            }
        ],
    },
]);