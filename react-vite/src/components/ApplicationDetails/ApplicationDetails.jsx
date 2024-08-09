import OpenModalButton from '../OpenModalButton';
import determineStatusClass from '../../utils/determineStatusClass';
import { FaRegFile, FaRegFileAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import './ApplicationDetails.css';

export default function ApplicationDetails() {
    const application = {
        "applied_date": "Tue, 06 Aug 2024 20:12:23 GMT",
        "category": {
            "id": 1,
            "name": "Frontend Engineer"
        },
        "company": {
            "created_at": "Tue, 06 Aug 2024 20:12:23 GMT",
            "id": 1,
            "name": "Apple",
            "updated_at": "Tue, 06 Aug 2024 20:12:23 GMT",
            "website": "https://www.apple.com/careers/us/"
        },
        "cover_letter_id": null,
        "created_at": "Tue, 06 Aug 2024 20:12:23 GMT",
        "id": 1,
        "resume_id": null,
        "salary_max": "250000.00",
        "salary_min": "135000.00",
        "status": {
            "id": 1,
            "name": "Applied"
        },
        "title": "Senior Software Engineer",
        "updated_at": "Tue, 06 Aug 2024 20:12:23 GMT"
    }

    return (
        <div id='application_details'>
            <div id='application_header'>
                <div id='application_header_title'>
                    <h1>{application.title}</h1>
                    <div id='company__container'>
                        <h2>{application.company.name}</h2>
                        <a target='_blank' rel='noopener noreferrer' href={application.company.website}>{application.company.name}&apos;s Career Page</a>
                    </div>
                </div>
                <div id='header_status_buttons'>
                    <h2 className={determineStatusClass(application.status.name)}>{application.status.name}</h2>
                    <div id='detail_button__container'>
                        <button id='edit_button'>Edit</button>
                        <button id='archive_button'>Archive</button>
                        {/* TODO create delete modal */}
                        <OpenModalButton buttonText={'Delete'} id={'delete_button'} />
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
                                <p>{application.category.name}</p>
                            </div>
                            <div>
                                <p>Salary Range:</p>
                                <p>${Number(application.salary_min)
                                    .toLocaleString('en-US', { minimumFractionDigits: 0 })}
                                    {' '}-{' '}
                                    {Number(application.salary_max)
                                        .toLocaleString('en-US', { minimumFractionDigits: 0 })}</p>
                            </div>
                            <div>
                                <p>Application Date:</p>
                                <p>{format(new Date(application.applied_date), 'M/d/yyyy')}</p>
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
                                    <button className='reminder_edit'>edit</button>
                                    <button className='reminder_delete'>delete</button>
                                </div>
                                <div className='reminder_card'>
                                    <div><p>10:00 am 11/10/24</p> <p>Negotiation</p></div>
                                    {/* TODO OpenModalButton for details modal */}
                                    <button className='reminder_edit'>edit</button>
                                    <button className='reminder_delete'>delete</button>
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
                                    <button className='reminder_edit'>edit</button>
                                    <button className='reminder_delete'>delete</button>
                                </div>
                            </div>
                            <div>
                                <h3>Cover Letter:</h3>
                                <div>
                                    <FaRegFileAlt fontSize={80} />
                                </div>
                                <div className='resume_cv_buttons'>
                                    {/* TODO view button */}
                                    <button className='reminder_edit'>edit</button>
                                    <button className='reminder_delete'>delete</button>
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
                                    <button className='reminder_edit'>edit</button>
                                    <button className='reminder_delete'>delete</button>
                                </div>
                                <div>
                                    <div className='note_card'>
                                        <p>Note about job application</p>
                                    </div>
                                    <button className='reminder_edit'>edit</button>
                                    <button className='reminder_delete'>delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}