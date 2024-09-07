import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { FaRegFile, FaRegFileAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { thunkGetApplicationById } from '../../redux/applications';
import OpenModalButton from '../OpenModalButton';
import LoadingPage from '../LoadingPage';
import determineStatusClass from '../../utils/determineStatusClass';
import handleFutureFeatureClick from '../../utils/handleFutureFeatureClick';
import './ApplicationDetails.css';
import DeleteModal from '../DeleteModal/DeleteModal';
import verifyStringLength from '../../utils/verifyStringLength';
import { toast } from 'react-toastify';
import StatusHistoryCard from './StatusHistoryCard';
import formatDate from '../../utils/formatDate';

export default function ApplicationDetails() {
    const sessionUser = useAppSelector(state => state.session.user);
    const { applicationId } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const application = useAppSelector(state => state.applications.data[applicationId]);
    const [isLoaded, setIsLoaded] = useState(false);
    let appliedDate;

    useEffect(() => {
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
    }, [dispatch, isLoaded, applicationId, navigate, sessionUser]);

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

    return (
        <>
            {isLoaded &&

                <div className='my-0 mx-auto pt-2.5'>
                    <div className='py-0 px-[150px] border-b border-solid border-[#484848] flex justify-between pb-[10px]'>
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
                        <div className='min-w-56 text-end flex flex-col gap-4'>
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
                                        />
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div id='main_section'>
                        <div id='main_left'>
                            <div>
                                <h2 className='text-2xl font-bold py-2'>Job Application Details:</h2>
                                <div id='app_details'>
                                    <div>
                                        <p>Category:</p>
                                        {application?.category?.name ?
                                            <p>{application?.category?.name}</p> :
                                            <p>Not Set</p>
                                        }
                                    </div>
                                    <div>
                                        <p>Salary Range:</p>
                                        {
                                            application.salary_min && application.salary_max ?
                                                <p>${Number(application.salary_min)
                                                    .toLocaleString('en-US', { minimumFractionDigits: 0 })}
                                                    {' '}-{' '}
                                                    {Number(application.salary_max)
                                                        .toLocaleString('en-US', { minimumFractionDigits: 0 })}</p> :
                                                <p>Not Set</p>
                                        }
                                    </div>
                                    <div>
                                        <p>Application Date:</p>
                                        {
                                            application.applied_date ?
                                                <p>{appliedDate}</p> :
                                                <p>Not Set</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className='text-2xl font-bold py-2'>Application Status History:</h2>
                                <div className='flex gap-2 mb-1'>
                                    <h3>Feature coming soon...</h3>
                                    <h4>Example below (Not actual data)</h4>
                                </div>
                                <div
                                    className=' scrollable-div
                                    border border-solid border-[#484848] rounded p-2
                                    flex flex-col gap-2 h-32 overflow-y-scroll
                                    '
                                >
                                    <StatusHistoryCard status='Offer Received' date={new Date(2024, 10, 7)} />
                                    <StatusHistoryCard status='Second Interview' date={new Date(2024, 10, 3)} />
                                    <StatusHistoryCard status='First Interview' date={new Date(2024, 10, 1)} />
                                    <StatusHistoryCard status='Applied' date={new Date(2024, 9, 24)} />
                                    {/* TODO add recent history and link to history page */}
                                </div>
                            </div>
                            <div>
                                <h2 className='text-2xl font-bold py-2'>Reminders:</h2>
                                <div id='app_reminders'>
                                    <h3>Feature coming soon...</h3>
                                    <h4>Example below (Not actual data)</h4>
                                    <div id='reminder__container'>
                                        <div className='reminder_card'>
                                            <div><p>10:00 am 11/10/24</p> <p>Negotiation</p></div>
                                            {/* TODO OpenModalButton for details modal */}
                                            <button onClick={handleFutureFeatureClick} className='edit_button'>edit</button>
                                            <button onClick={handleFutureFeatureClick} className='delete_button'>delete</button>
                                        </div>
                                        <div className='reminder_card'>
                                            <div><p>10:00 am 11/10/24</p> <p>Negotiation</p></div>
                                            {/* TODO OpenModalButton for details modal */}
                                            <button onClick={handleFutureFeatureClick} className='edit_button'>edit</button>
                                            <button onClick={handleFutureFeatureClick} className='delete_button'>delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id='main_right'>
                            <div>
                                <h2 className='text-2xl font-bold py-2'>Documents:</h2>
                                <div id='resume_cv'>
                                    <div>
                                        <h3>Resume:</h3>
                                        <div>
                                            <FaRegFile fontSize={80} />
                                        </div>
                                        <div className='resume_cv_buttons'>
                                            {/* TODO View button */}
                                            <button onClick={handleFutureFeatureClick} className='edit_button'>edit</button>
                                            <button onClick={handleFutureFeatureClick} className='delete_button'>delete</button>
                                        </div>
                                    </div>
                                    <div>
                                        <h3>Cover Letter:</h3>
                                        <div>
                                            <FaRegFileAlt fontSize={80} />
                                        </div>
                                        <div className='resume_cv_buttons'>
                                            {/* TODO view button */}
                                            <button onClick={handleFutureFeatureClick} className='edit_button'>edit</button>
                                            <button onClick={handleFutureFeatureClick} className='delete_button'>delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className='text-2xl font-bold py-2'>Notes:</h2>
                                <div id='app_notes'>
                                    <h3>Feature coming soon...</h3>
                                    <h4>Example below</h4>
                                    <div className='note_card__container'>
                                        <div>
                                            <div className='note_card'>
                                                <p>Note about job application</p>
                                            </div>
                                            <button onClick={handleFutureFeatureClick} className='edit_button'>edit</button>
                                            <button onClick={handleFutureFeatureClick} className='delete_button'>delete</button>
                                        </div>
                                        <div>
                                            <div className='note_card'>
                                                <p>Note about job application</p>
                                            </div>
                                            <button onClick={handleFutureFeatureClick} className='edit_button'>edit</button>
                                            <button onClick={handleFutureFeatureClick} className='delete_button'>delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            }
            {!isLoaded && <LoadingPage />}
        </>
    )
}