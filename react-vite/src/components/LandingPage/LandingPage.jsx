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
import { FaProjectDiagram, FaChartBar, FaTasks, FaCalendarCheck } from "react-icons/fa";

export default function LandingPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const recent_applications = useSelector(state => state.applications);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!sessionUser) {
            setIsLoaded(true)
        } else {
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
                <div id="hero" className="flex justify-center items-center text-center">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-bold">Welcome to ApplySage</h1>
                        <h2 className="text-2xl">Your Next Job Application Tracker</h2>
                        <p className="mb-2">Where Job Applications Meet Insight</p>
                        <div className="flex justify-around gap-2">
                            <OpenModalButton
                                className='bg-btn-main hover:bg-btn-main-hover'
                                modalComponent={<SignupFormModal />}
                                buttonText={'Get Started For Free'}
                            />
                            <button className="bg-[rgba(69,111,61,0.595)] hover:bg-[rgba(69,111,61,0.5)]" onClick={handleFutureFeatureClick}>LearnMore</button>
                        </div>
                    </div>
                </div >
                <div id="features" className='bg-main flex items-center justify-around pt-[25px]'>
                    <div className=" feature_card flex flex-col justify-center items-center gap-2 text-center">
                        <FaTasks fontSize={40} />
                        <strong>Tracking and Management</strong>
                        <p className="text-sm text-[rgb(255,255,255,50%)] w-10/12">
                            &quot;Keep all your job applications in one place and never miss a follow up.&quot;
                        </p>
                    </div>
                    <div className=" feature_card flex flex-col justify-center items-center gap-2 text-center">
                        <FaCalendarCheck fontSize={40} />
                        <strong>Notifications and Reminders</strong>
                        <p className="text-sm text-[rgb(255,255,255,50%)] w-10/12">
                            &quot;Receive timely reminders for application deadlines and follow-ups.&quot;
                        </p>
                    </div>
                    <div className="feature_card flex flex-col justify-center items-center gap-2 text-center">
                        <FaChartBar fontSize={40} />
                        <strong>Analytics and Insight</strong>
                        <p className="text-sm text-[rgb(255,255,255,50%)] w-10/12">
                            &quot;Gain insights into your application progress and success rates.&quot;
                        </p>
                    </div>
                    <div className="feature_card flex flex-col justify-center items-center gap-2 text-center">
                        <FaProjectDiagram fontSize={40} />
                        <strong>Customizable Workflows</strong>
                        <p className="text-sm text-[rgb(255,255,255,50%)] w-10/12">
                            &quot;Tailor the application process to fit your unique job search strategy.&quot;
                        </p>
                    </div>
                </div>
                <div id="testimonies" className="flex flex-col justify-center items-center pt-[40px] 2xl:flex-row">
                    <div className="flex items-center justify-between mt-[-40px] 2xl:justify-around">
                        <img className="h-[100px]" src='/aa-favicon.ico' alt="testimonial-avatar" />
                        <p>&quot;ApplySage helped me land my dream job!&quot; - Jane Doe</p>
                    </div>
                    <div className="flex items-center justify-between mt-[-40px]  2xl:justify-around">
                        <img className="h-[100px]" src="/aa-favicon.ico" alt="testimonial-avatar" />
                        <p>&quot;The best tool for managing job applications!&quot; - John Smith</p>
                    </div>
                    <div className="flex items-center justify-between mt-[-40px]  2xl:justify-around">
                        <img className="h-[100px]" src="/aa-favicon.ico" alt="testimonial-avatar" />
                        <p>&quot;I love the insights and reminders.&quot; - Emily Johnson</p>
                    </div>
                </div>
                <div id="pricing" className="bg-main flex flex-col items-center">
                    <div id="price_card__container" className="flex justify-evenly items-center text-center gap-[20px] {}">
                        <div className="price_card bg-[rgba(255,255,255,0.9)] rounded text-main-dark p-[20px] flex flex-col items-start">
                            <h2 className="mb-0">Free Plan:</h2>
                            <span className="flex items-end justify-start gap-[10px]">
                                <h1 className="text-5xl mt-[15px]">$0</h1><p>/month</p>
                            </span>
                            <ul className=" mt-1 pl-[10px]">
                                <li>Basic tracking features</li>
                                <li>Email notifications</li>
                                <li>Community support</li>
                            </ul>
                        </div>
                        <div className="price_card bg-[rgba(255,255,255,0.9)] rounded text-main-dark p-[20px] flex flex-col items-start">
                            <h2>Pro Plan:</h2>
                            <span className="flex items-end justify-start gap-[10px]">
                                <h1 className="text-5xl mt-[15px]">$10</h1><p>/month</p>
                            </span>
                            <ul className="mt-1 pl-[10px]">
                                <li>All Free features plus</li>
                                <li>Advanced analytics</li>
                                <li>Customizable workflows</li>
                                <li>Priority support</li>
                            </ul>
                        </div>
                        <div className="price_card bg-[rgba(255,255,255,0.9)] rounded text-main-dark p-[20px] flex flex-col items-start">
                            <h2>Premium Plan:</h2>
                            <span className="flex items-end justify-start gap-[10px]">
                                <h1 className="text-5xl mt-[15px]">$25</h1><p>/month</p>
                            </span>
                            <ul className="mt-1 pl-[10px]">
                                <li>All Pro features plus</li>
                                <li>One-on-one career coaching</li>
                                <li>Resume and cover letter reviews</li>
                                <li>Dedicated support</li>
                            </ul>
                        </div>
                    </div>
                    <button className="bg-btn-main hover:bg-btn-main-hover" onClick={handleFutureFeatureClick}>Choose Your Plan</button>
                </div>
                <div id="mission" className="flex justify-center items-center text-center">
                    <p className="text-xl w-[55%]">ApplySage is dedicated to helping job seekers manage their applications with ease and efficiency.
                        Our mission is to provide smart, insightful tools that support your career journey.</p>
                </div>
            </>
        )
    } else {
        content = (
            // TODO Still needs tailwind conversion
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
                        {recent_applications.allIds.length === 0 &&
                            <h2>Add some applications and they will show up here!</h2>
                        }
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