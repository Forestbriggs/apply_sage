import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetUserDashboard } from "../../redux/applications";
import { format } from "date-fns";
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from "../SignupFormModal";
import LoadingPage from '../LoadingPage';
import handleFutureFeatureClick from '../../utils/handleFutureFeatureClick';
import './LandingPage.css';
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const recent_applications = useSelector(state => state.applications);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!sessionUser) {
            setIsLoaded(true)
        } else if (!isLoaded) {
            dispatch(thunkGetUserDashboard()).then(() => {
                setIsLoaded(true)
            })
        }
    }, [isLoaded, sessionUser, dispatch])

    const handleRecentAppClick = (application_id) => {
        return navigate(`applications/${application_id}`);
    }

    const handleNewApplicationClick = () => {
        return navigate('/companies/select');
    }

    let content;
    if (!sessionUser) {
        content = (
            <>
                <div id="hero">
                    <div>
                        <h1>Welcome to ApplySage</h1>
                        <h2>Your Next Job Application Tracker</h2>
                        <p>Where Job Applications Meet Insight</p>
                        <div id="hero_buttons">
                            <OpenModalButton
                                id='get_started'
                                modalComponent={<SignupFormModal />}
                                buttonText={'Get Started For Free'}
                            />
                            <button onClick={handleFutureFeatureClick} id="learn_more">LearnMore</button>
                        </div>
                    </div>
                </div>
                <div id="features">
                    <div className="feature_card">
                        <img src="/aa-favicon.ico" alt="" />
                        <strong>Tracking and Management</strong>
                        <p className="feature_quote">
                            &quot;Keep all your job applications in one place and never miss a follow up.&quot;
                        </p>
                    </div>
                    <div className="feature_card">
                        <img src="/aa-favicon.ico" alt="" />
                        <strong>Notifications and Reminders</strong>
                        <p className="feature_quote">
                            &quot;Receive timely reminders for application deadlines and follow-ups.&quot;
                        </p>
                    </div>
                    <div className="feature_card">
                        <img src="/aa-favicon.ico" alt="" />
                        <strong>Analytics and Insight</strong>
                        <p className="feature_quote">
                            &quot;Gain insights into your application progress and success rates.&quot;
                        </p>
                    </div>
                    <div className="feature_card">
                        <img src="/aa-favicon.ico" alt="" />
                        <strong>Customizable Workflows</strong>
                        <p className="feature_quote">
                            &quot;Tailor the application process to fit your unique job search strategy.&quot;
                        </p>
                    </div>
                </div>
                <div id="testimonies">
                    <div>
                        <img src="/aa-favicon.ico" alt="" />
                        <p>&quot;ApplySage helped me land my dream job!&quot; - Jane Doe</p>
                    </div>
                    <div>
                        <img src="/aa-favicon.ico" alt="" />
                        <p>&quot;The best tool for managing job applications!&quot; - John Smith</p>
                    </div>
                    <div>
                        <img src="/aa-favicon.ico" alt="" />
                        <p>&quot;I love the insights and reminders.&quot; - Emily Johnson</p>
                    </div>
                </div>
                <div id="pricing">
                    <div id="price_card__container">
                        <div className="price_card">
                            <h2>Free Plan:</h2>
                            <span><h1>$0</h1><p>/month</p></span>
                            <ul>
                                <li>Basic tracking features</li>
                                <li>Email notifications</li>
                                <li>Community support</li>
                            </ul>
                        </div>
                        <div className="price_card">
                            <h2>Pro Plan:</h2>
                            <span><h1>$10</h1><p>/month</p></span>
                            <ul>
                                <li>All Free features plus</li>
                                <li>Advanced analytics</li>
                                <li>Customizable workflows</li>
                                <li>Priority support</li>
                            </ul>
                        </div>
                        <div className="price_card">
                            <h2>Premium Plan:</h2>
                            <span><h1>$25</h1><p>/month</p></span>
                            <ul>
                                <li>All Pro features plus</li>
                                <li>One-on-one career coaching</li>
                                <li>Resume and cover letter reviews</li>
                                <li>Dedicated support</li>
                            </ul>
                        </div>
                    </div>
                    <button onClick={handleFutureFeatureClick}>Choose Your Plan</button>
                </div>
                <div id="mission">
                    <p>ApplySage is dedicated to helping job seekers manage their applications with ease and efficiency.
                        Our mission is to provide smart, insightful tools that support your career journey.</p>
                </div>
            </>
        )
    } else {
        content = (
            <>
                <div id="hero" className="hero_logged_in">
                    <h1>Hello {sessionUser.username}!</h1>
                    <input type="search" placeholder="Search for applications" />
                    <button onClick={handleNewApplicationClick}>Add Application</button>
                </div>
                <div id="recent_apps">
                    <div id="recent_apps_title">
                        <h2>Recent Applications</h2>
                    </div>
                    <div id="app_card__container">
                        {recent_applications.allIds.map((application_id) => {
                            const application = recent_applications.data[application_id];
                            return (
                                <div onClick={() => handleRecentAppClick(application_id)} key={`dash-app-${application_id}`}>
                                    {/* <img src="/aa-favicon.ico" alt="" /> */}
                                    <h3>{application.company.name}</h3>
                                    <p>Position:</p>
                                    <p>{application.title}</p>
                                    <h2>Submitted:</h2>
                                    <h2>{format(new Date(application.applied_date), 'M/d/yyyy')}</h2>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div id="app_metrics">
                    <h2>Application Metrics</h2>
                </div>
            </>
        )
    }



    return (
        <>
            {isLoaded && content}
            {!isLoaded && <LoadingPage />}
        </>
    )
}