import { useDispatch, useSelector } from 'react-redux';
import ApplicationCard from './ApplicationCard';
import { useEffect, useState } from 'react';
import { thunkGetUserApplications } from '../../redux/applications';
import LoadingPage from '../LoadingPage/LoadingPage';
import './ApplicationList.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCarrot, FaRegCaretSquareRight } from 'react-icons/fa';
import { BiCaretRight } from 'react-icons/bi';
import { FaCaretRight } from 'react-icons/fa6';
import { PiCaretLeftLight, PiCaretRightLight } from 'react-icons/pi';



export default function ApplicationList() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const applications = useSelector(state => state.applications);
    const [totalApps, setTotalApps] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!sessionUser) {
            return navigate('/');
        }
        if (!isLoaded) {
            dispatch(thunkGetUserApplications(page)).then((data) => {
                setTotalApps(data.total);
                setTotalPages(data.pages);
                setIsLoaded(true);
            }).catch(() => {
                toast('There was an error fetching applications');
                return navigate('/error-page')
            })
        }
    }, [dispatch, isLoaded, navigate, sessionUser, page])

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
        navigate('/companies/select');
    }

    const startApp = (page - 1) * 10 + 1;
    const endApp = Math.min(page * 10, totalApps);

    return (
        <>
            {isLoaded &&
                <div>
                    <div
                        className='
                        w-11/12 mx-auto pt-2.5
                        '
                    >
                        <h1 className='text-2xl font-bold py-2 pb-5 sm:text-3xl'>Your Applications</h1>
                        <div
                            className='
                            flex flex-col gap-4
                            '
                        >
                            {
                                applications.allIds.map((application_id) => {
                                    const application = applications.data[application_id];
                                    return (
                                        <div key={`application-${application.id}`}>
                                            <ApplicationCard application={application} />
                                        </div>
                                    )
                                })
                            }
                            {applications.allIds.length === 0 &&
                                <div>
                                    <h3>Add some applications and you will find them here!</h3>
                                    <button onClick={handleAddClick} className='add_button'>Add Application</button>
                                </div>
                            }
                        </div>
                        <div className='py-4 flex flex-col justify-start gap-2'>
                            <div className='flex gap-2 items-center' l>
                                <button
                                    onClick={handlePreviousPage} disabled={page === 1}
                                    className={`flex items-center bg-slate-300 py-0 px-2 rounded text-[#1F1F1F] ${page === 1 ? 'opacity-20' : ''}`}
                                >
                                    <PiCaretLeftLight />Prev
                                </button>
                                <span>Page {page} of {totalPages}</span>
                                <button
                                    onClick={handleNextPage} disabled={page === totalPages}
                                    className={`flex  items-center bg-slate-300 py-0 px-2 border rounded text-[#1F1F1F] ${page === totalPages ? 'opacity-20' : ''}`}
                                >
                                    Next<PiCaretRightLight />
                                </button>
                            </div>
                            <p className='text-sm'>{startApp} - {endApp} of {totalApps}</p>
                        </div>
                    </div>
                </div >
            }
            {!isLoaded && <LoadingPage />}
        </>
    )
}