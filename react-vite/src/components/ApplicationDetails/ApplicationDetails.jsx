import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaRegFile, FaRegFileAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { thunkGetApplicationById } from '../../redux/applications';
// import OpenModalButton from '../OpenModalButton';
import LoadingPage from '../LoadingPage';
import determineStatusClass from '../../utils/determineStatusClass';
import handleFutureFeatureClick from '../../utils/handleFutureFeatureClick';
import './ApplicationDetails.css';

export default function ApplicationDetails() {
    const { applicationId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const application = useSelector(state => state.applications.data[applicationId]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded) {
            dispatch(thunkGetApplicationById(applicationId)).then(() => {
                setIsLoaded(true);
            }, [dispatch, isLoaded])
        }
    })

    const handleBackClick = () => {
        return navigate('..')
    }

    return (
        <>
            {isLoaded &&

                <div id='application_details'>
                    <div id='application_header'>
                        <div id='application_header_title'>
                            <span onClick={handleBackClick} id='back_button'><div>{'<'}</div><p>Back to applications</p></span>
                            <h1>{application.title}</h1>
                            <div id='company__container'>
                                <h2>{application.company.name}</h2>
                                {
                                    application?.company?.website &&
                                    <a target='_blank' rel='noopener noreferrer' href={application.company.website}>{application.company.name}&apos;s Career Page</a>
                                }
                            </div>
                        </div>
                        <div id='header_status_buttons'>
                            <h2 className={determineStatusClass(application.status.name)}>{application.status.name}</h2>
                            <div id='detail_button__container'>
                                <button onClick={handleFutureFeatureClick} className='edit_button'>Edit</button>
                                <button onClick={handleFutureFeatureClick} id='archive_button'>Archive</button>
                                {/* TODO create delete modal */}
                                {/* <OpenModalButton buttonText={'Delete'} id={'delete_button'} /> */}
                                <button onClick={handleFutureFeatureClick} className='delete_button'>Delete</button>
                            </div>
                        </div>
                    </div>
                    <div id='main_section'>
                        <div id='main_left'>
                            <div>
                                <h2>Job Application Details:</h2>
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
                                                <p>{format(new Date(application.applied_date), 'M/d/yyyy')}</p> :
                                                <p>Not Set</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2>Application Status History:</h2>
                                <div id='app_status_history'>
                                    <h3>Feature coming soon...</h3>
                                    <h4>Example below (Not actual data)</h4>
                                    <div>
                                        <p>Offer Received:</p>
                                        <p>11/7/24</p>
                                    </div>
                                    <div>
                                        <p>Second Interview:</p>
                                        <p>11/3/24</p>
                                    </div>
                                    <div>
                                        <p>First Interview:</p>
                                        <p>10/27/24</p>
                                    </div>
                                    <div>
                                        <p>Applied:</p>
                                        <p>10/20/24</p>
                                    </div>
                                    {/* TODO add recent history and link to history page */}
                                </div>
                            </div>
                            <div>
                                <h2>Reminders:</h2>
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
                                <h2>Attachments:</h2>
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
                                <h2>Notes:</h2>
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
                </div>
            }
            {!isLoaded && <LoadingPage />}
        </>
    )
}