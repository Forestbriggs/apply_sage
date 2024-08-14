import { useDispatch, useSelector } from 'react-redux';
import ApplicationCard from './ApplicationCard';
import { useEffect, useState } from 'react';
import { thunkGetUserApplications } from '../../redux/applications';
import LoadingPage from '../LoadingPage/LoadingPage';
import './ApplicationList.css';
import { useNavigate } from 'react-router-dom';




export default function ApplicationList() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const applications = useSelector(state => state.applications);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!sessionUser) {
            return navigate('/');
        }
        if (!isLoaded) {
            dispatch(thunkGetUserApplications()).then(() => {
                setIsLoaded(true);
            }, [dispatch, isLoaded])
        }
    })

    const handleAddClick = () => {
        navigate('/companies/select');
    }

    return (
        <>
            {isLoaded &&
                <div id='application_list'>
                    <div id='application_list__container'>
                        <h1>Your Applications</h1>
                        <div id='applications__container'>
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
                        <div id='pagination'>
                            {/* TODO update when pagination is added */}
                            <p>Showing {applications.allIds.length} of {applications.allIds.length}</p>
                        </div>
                    </div>
                </div>
            }
            {!isLoaded && <LoadingPage />}
        </>
    )
}