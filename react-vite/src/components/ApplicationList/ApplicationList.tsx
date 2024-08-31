import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import ApplicationCard from './ApplicationCard';
import { useEffect, useState } from 'react';
import { thunkGetUserApplications } from '../../redux/applications';
import LoadingPage from '../LoadingPage/LoadingPage';
import './ApplicationList.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PiCaretLeftLight, PiCaretRightLight } from 'react-icons/pi';

export type Application = {
    id: number;
    user_id: number;
    title: string;
    status: {
        id: number;
        name: string;
    };
    company: {
        id: number;
        name: string;
        website?: string;
    };
    salary_min?: number;
    salary_max?: number;
    resume_id?: number;
    cover_letter_id?: number;
    applied_date?: string;
    created_at: string;
    updated_at: string;
};

export default function ApplicationList() {
    const sessionUser = useAppSelector(state => state.session.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const applications = useAppSelector(state => state.applications);
    const [totalApps, setTotalApps] = useState(0);
    const [page, setPage] = useState(() => {
        const savedPage = sessionStorage.getItem('app-page');
        return savedPage ? parseInt(savedPage, 10) : 1;
    });
    const [perPage, setPerPage] = useState(() => {
        const savedPerPage = localStorage.getItem('app-perPage');
        return savedPerPage ? parseInt(savedPerPage, 10) : 10;
    });
    const [totalPages, setTotalPages] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!sessionUser) {
            return navigate('/');
        }
        if (!isLoaded) {
            const getUserApplications = async () => {
                try {
                    const data = await dispatch(thunkGetUserApplications(page, perPage));
                    setTotalApps(data.total);
                    setTotalPages(data.pages);
                    setIsLoaded(true);
                } catch (e) {
                    toast.error('There was an error fetching applications');
                    return navigate('/error-page');
                }
            };
            getUserApplications();
        }
    }, [dispatch, isLoaded, navigate, sessionUser, page, perPage]);

    // * Saves page and perPage to session / local storage whenever they change
    useEffect(() => {
        sessionStorage.setItem('app-page', page.toString());
        localStorage.setItem('app-perPage', perPage.toString());
    }, [page, perPage])

    const handlePerPageChange = (e: any) => {
        setPage(1)
        setPerPage(e.target.value);
        // TODO refine logic for when not to refresh, came up with at 1am smh
        if (perPage > e.target.value || totalApps > e.target.value) {
            setIsLoaded(false);
        }
    }

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
            setIsLoaded(false);
        }
    }

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
            setIsLoaded(false)
        }
    }

    const handleAddClick = () => {
        sessionStorage.removeItem('app-page');
        navigate('/companies/select');
    }

    const startApp = (page - 1) * perPage + 1;
    const endApp = Math.min(page * perPage, totalApps);

    return (
        <>
            {isLoaded &&
                <div>
                    <div
                        className='
                        w-11/12 mx-auto pt-2.5
                        '
                    >
                        <div className='flex items-center justify-between'>
                            <h1 className='text-2xl font-bold py-2 pb-5 sm:text-3xl'>Your Applications</h1>
                            <div className='flex flex-col-reverse items-end gap-2'>
                                <select
                                    className='text-main-dark rounded mb-2'
                                    name="perPage"
                                    id="perPage"
                                    value={perPage}
                                    onChange={handlePerPageChange}
                                >
                                    <option value={10}>10 per page</option>
                                    <option value={20}>20 per page</option>
                                    <option value={50}>50 per page</option>
                                    <option value={100}>100 per page</option>
                                </select>
                                <button
                                    className='bg-btn-main hover:bg-btn-main-hover'
                                    onClick={handleAddClick}
                                >
                                    Add Application
                                </button>
                            </div>
                        </div>
                        <div
                            className='
                            flex flex-col  gap-2
                            '
                        >
                            {
                                applications.allIds.map((application_id) => {
                                    const application: Application = applications.data[application_id];
                                    return (
                                        <div key={`application-${application.id}`}>
                                            <ApplicationCard application={application} />
                                        </div>
                                    )
                                })
                            }
                            {applications.allIds.length === 0 &&
                                <div className='w-8/12 text-center mx-auto mt-4'>
                                    <h3 className='text-xl'>Add some applications and you will find them here!</h3>
                                </div>
                            }
                        </div>
                        {
                            totalApps > 0 &&
                            <div className='py-4 flex flex-col justify-start gap-2'>
                                <div className='flex gap-2 items-center'>
                                    <button
                                        onClick={handlePreviousPage} disabled={page === 1}
                                        className={`flex items-center bg-slate-300 py-0 px-2 rounded text-[#1F1F1F] ${page === 1 ? 'opacity-20' : ''}`}
                                    >
                                        <PiCaretLeftLight />Prev
                                    </button>
                                    <span>Page {page} of {totalPages}</span>
                                    <button
                                        onClick={handleNextPage} disabled={page === totalPages}
                                        className={`flex items-center bg-slate-300 py-0 px-2 border rounded text-[#1F1F1F] ${page === totalPages ? 'opacity-20' : ''}`}
                                    >
                                        Next<PiCaretRightLight />
                                    </button>
                                </div>
                                <p className='text-sm'>{startApp} - {endApp} of {totalApps}</p>
                            </div>
                        }
                    </div>
                </div >
            }
            {!isLoaded && <LoadingPage />}
        </>
    )
}