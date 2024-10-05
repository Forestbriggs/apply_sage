import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { thunkGetApplicationById } from '../../redux/applications';
import OpenModalButton from '../OpenModalButton';
import LoadingPage from '../LoadingPage';
import DeleteModal from '../DeleteModal/DeleteModal';
import Overview from './Overview';
import NotesReminders from './NotesReminders';
import Documents from './Documents';
import { toast } from 'react-toastify';
import determineStatusClass from '../../utils/determineStatusClass';
import handleFutureFeatureClick from '../../utils/handleFutureFeatureClick';
import formatDate from '../../utils/formatDate';
import verifyStringLength from '../../utils/verifyStringLength';
import './ApplicationDetails.css';

export default function ApplicationDetails({ tab }: { tab: string }) {
    const { applicationId } = useParams();
    console.log(tab);
    const sessionUser = useAppSelector(state => state.session.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const application = useAppSelector(state => state.applications.data[applicationId]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pendingDelete, setPendingDelete] = useState(false);
    let appliedDate;

    useEffect(() => {
        if (pendingDelete) {
            return;
        }
        if (!sessionUser) {
            return navigate('/unauthorized');
        }
        if (!Number.isInteger(Number(applicationId))) {
            return navigate('/error-page');
        }
        if (!isLoaded) {
            const getApplicationById = async () => {
                try {
                    const application = await dispatch(thunkGetApplicationById(applicationId));
                    if (sessionUser.id !== application.user_id) {
                        return navigate('/unauthorized');
                    }
                    setIsLoaded(true);
                } catch (e) {
                    toast.error('There was an error fetching the application');
                    return navigate('/error-page');
                }
            };
            getApplicationById();
        }
    }, [dispatch, isLoaded, applicationId, navigate, sessionUser, pendingDelete]);

    if (isLoaded && application?.applied_date) {
        appliedDate = formatDate(application.applied_date);
    }

    const handleBackClick = () => {
        return navigate('..')
    }

    const handleEditClick = () => {
        return navigate('edit');
    }

    const navigateOnDelete = () => {
        return navigate('/applications');
    }

    const determineTabClass = (currTab: string) => {
        if (currTab === tab) {
            return 'tab-btn bg-tab-btn-active hover:bg-tab-btn-hover text-sm';
        }
        return 'tab-btn bg-tab-btn hover:bg-tab-btn-hover text-sm';
    }

    const navigateTab = (newTab: string) => {
        return navigate(`/applications/${applicationId}/${newTab}`);
    }

    return (
        <>
            {isLoaded &&

                <div
                    className='my-0 mx-auto pt-2.5'
                >
                    {/* Header */}
                    <div
                        className='
                        flex flex-col gap-2 px-4 border-b border-solid border-[#484848]
                        md:flex-row md:justify-between md:gap-0
                        '
                    // py-0 px-[150px] border-b border-solid border-[#484848] flex justify-between pb-[10px]
                    >
                        <div>
                            <span onClick={handleBackClick} id='back_button'><div>{'<'}</div><p>Back to applications</p></span>
                            <h1
                                className={`${verifyStringLength(application.title, 18) ? '' : 'break-all w-[90%]'}
                                    mt-2 mb-1 text-3xl font-bold`}
                            >{application.title}</h1>
                            <div className='flex items-center gap-8'>
                                <h2 className='text-2xl'>{application.company.name}</h2>
                                {
                                    application?.company?.website &&
                                    <a
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        href={application.company.website}
                                    >
                                        {application.company.name}&apos;s Career Page
                                    </a>
                                }
                            </div>
                        </div>
                        <div
                            className='
                            text-end flex flex-col items-end gap-2 -mt-9
                            md:gap-4 md:items-end md:mt-0
                            '
                        >
                            <div className='flex flex-col gap-2'>

                                <h2 className={`${determineStatusClass(application.status.name)}
                                            text-xl`}
                                >
                                    {application.status.name}
                                </h2>
                                <div
                                    id='detail_button__container'
                                    className='border border-solid border-[#484848] 
                                rounded p-2.5 flex gap-2.5'
                                >
                                    <button
                                        onClick={handleEditClick}
                                        className='bg-edit-btn hover:bg-edit-btn-hover'
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={handleFutureFeatureClick}
                                        id='archive_button'
                                    >
                                        Archive
                                    </button>
                                    <OpenModalButton
                                        buttonText={'Delete'}
                                        className={'delete_button'}
                                        modalComponent={
                                            <DeleteModal
                                                typeId={Number(applicationId)}
                                                navigateOnDelete={navigateOnDelete}
                                                type={'application'}
                                                setIsLoaded={setIsLoaded}
                                                setPendingDelete={setPendingDelete}
                                            />
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                {/* Tabs */}
                                <div className='flex items-center gap-2 -mb-0.25'>
                                    <button
                                        onClick={() => navigateTab('')}
                                        className={`${determineTabClass('overview')}`}
                                    >
                                        Overview
                                    </button>
                                    <button
                                        onClick={() => navigateTab('notes-and-reminders')}
                                        className={`${determineTabClass('notes-and-reminders')}`}
                                    >
                                        Notes and Reminders
                                    </button>
                                    <button
                                        onClick={() => navigateTab('documents')}
                                        className={`${determineTabClass('documents')}`}
                                    >
                                        Documents
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        {tab === 'overview' && <Overview application={application} appliedDate={appliedDate!} />}
                        {tab === 'notes-and-reminders' && <NotesReminders />}
                        {tab === 'documents' && <Documents />}
                    </div>




                </div >
            }
            {!isLoaded && <LoadingPage />}
        </>
    )
}