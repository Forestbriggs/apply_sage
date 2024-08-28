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
                <div id="hero"
                    className="
                    flex justify-center items-center text-center h-fit py-6
                    sm:py-10
                    transition-all
                    "
                >
                    <div
                        className="
                        flex flex-col gap-2
                        "
                    >
                        <h1
                            className="
                            text-2xl font-bold
                            sm:text-3xl
                            transition-all
                            "
                        >
                            Welcome to ApplySage
                        </h1>
                        <h2
                            className="
                            text-lg
                            sm:text-2xl
                            transition-all
                            "
                        >
                            Your Next Job Application Tracker
                        </h2>
                        <p
                            className="
                            text-sm mb-2
                            sm:text-base
                            transition-all
                            "
                        >
                            Where Job Applications Meet Insight
                        </p>
                        <div
                            className="
                            flex justify-around gap-2
                            "
                        >
                            <OpenModalButton
                                className='bg-btn-main hover:bg-btn-main-hover'
                                modalComponent={<SignupFormModal />}
                                buttonText={'Get Started For Free'}
                            />
                            <button
                                className="bg-[rgba(69,111,61,0.595)] hover:bg-[rgba(69,111,61,0.5)]"
                                onClick={handleFutureFeatureClick}
                            >
                                LearnMore
                            </button>
                        </div>
                    </div>
                </div >

                <div id="features"
                    className='
                    flex flex-col flex-1 bg-main items-center justify-around h-fit gap-4 py-8 px-4
                    feature-main:py-14 feature-main:flex-row
                    '
                >
                    <div
                        className="
                        flex flex-1 justify-center items-center gap-4 text-center w-4/5 my-0 mx-auto
                        border border-alt rounded-md p-6
                        feature-main:flex-col feature-main:w-fit feature-main:gap-2
                        "
                    >
                        <FaTasks className="text-7xl feature-main:text-5xl" />
                        <div className="flex flex-col justify-center items-center gap-1">
                            <strong>Tracking and Management</strong>
                            <p className="text-sm text-[rgb(255,255,255,50%)] min-[530px]:w-10/12">
                                &quot;Keep all your job applications in one place and never miss a follow up.&quot;
                            </p>
                        </div>
                    </div>
                    <div
                        className="
                        flex flex-1 justify-center items-center gap-4 text-center w-4/5 my-0 mx-auto
                        border border-alt rounded-md p-6
                        feature-main:flex-col feature-main:w-fit feature-main:gap-2
                        "
                    >
                        <FaCalendarCheck className="text-7xl feature-main:text-5xl" />
                        <div className="flex flex-col justify-center items-center gap-1">
                            <strong>Notifications and Reminders</strong>
                            <p className="text-sm text-[rgb(255,255,255,50%)] min-[530px]:w-10/12">
                                &quot;Receive timely reminders for application deadlines and follow-ups.&quot;
                            </p>
                        </div>
                    </div>
                    <div
                        className="
                        flex flex-1 justify-center items-center gap-4 text-center w-4/5 my-0 mx-auto
                        border border-alt rounded-md p-6
                        feature-main:flex-col feature-main:w-fit feature-main:gap-2
                        "
                    >
                        <FaChartBar className="text-7xl feature-main:text-5xl" />
                        <div className="flex flex-col justify-center items-center gap-1">
                            <strong>Analytics and Insight</strong>
                            <p className="text-sm text-[rgb(255,255,255,50%)] min-[530px]:w-10/12">
                                &quot;Gain insights into your application progress and success rates.&quot;
                            </p>
                        </div>
                    </div>
                    <div
                        className="
                        flex flex-1 justify-center items-center gap-4 text-center w-4/5 my-0 mx-auto
                        border border-alt rounded-md p-6
                        feature-main:flex-col feature-main:w-fit feature-main:gap-2
                        "
                    >
                        <FaProjectDiagram className="text-7xl feature-main:text-5xl" />
                        <div className="flex flex-col justify-center items-center gap-1">
                            <strong>Customizable Workflows</strong>
                            <p className="text-sm text-[rgb(255,255,255,50%)] min-[530px]:w-10/12">
                                &quot;Tailor the application process to fit your unique job search strategy.&quot;
                            </p>
                        </div>
                    </div>
                </div>

                <div id="testimonies"
                    className="
                    h-fit
                    flex flex-col justify-center items-center gap-6 py-8 px-4
                    sm:gap-0 sm:mt-[40px]
                    2xl:flex-row
                    "
                >
                    <div className="
                flex flex-col items-center justify-between gap-2
                sm:flex-row sm:w-[clamp(400px,60dvw,800px)] sm:gap-0
                2xl:flex-col 2xl:gap-5 sm:mt-[-40px]
                ">
                        <img className="h-20 sm:h-[100px]" src='/aa-favicon.ico' alt="testimonial-avatar" />
                        <div className="flex flex-col justify-center items-center gap-1 sm:items-end lg:flex-row 2xl:flex-col 2xl:items-center">
                            <p>&quot;ApplySage helped me land my dream job!&quot;</p>
                            <span className="text-sm text-[rgb(255,255,255,50%)]"> - Jane Doe (Sample Testimonial)</span>
                        </div>
                    </div>
                    <div className="
                flex flex-col items-center justify-between gap-2
                sm:flex-row sm:w-[clamp(400px,60dvw,800px)] sm:gap-0
                2xl:flex-col 2xl:gap-5 sm:mt-[-40px]
                ">
                        <img className="h-20 sm:h-[100px]" src="/aa-favicon.ico" alt="testimonial-avatar" />
                        <div className="flex flex-col justify-center items-center gap-1 sm:items-end lg:flex-row 2xl:flex-col 2xl:items-center">
                            <p className="2xl:flex 2xl:flex-col 2xl:text-center">&quot;The best tool for managing job applications!&quot;</p>
                            <span className="text-sm text-[rgb(255,255,255,50%)]">- John Smith (Sample Testimonial)</span>
                        </div>
                    </div>
                    <div className="
                flex flex-col items-center justify-between gap-2
                sm:flex-row  sm:w-[clamp(400px,60dvw,800px)] sm:gap-0
                2xl:flex-col 2xl:gap-5 sm:mt-[-40px]
                ">
                        <img className="h-20 sm:h-[100px]" src="/aa-favicon.ico" alt="testimonial-avatar" />
                        <div className="flex flex-col justify-center items-center gap-1 sm:items-end lg:flex-row 2xl:flex-col 2xl:items-center">
                            <p className="2xl:flex 2xl:flex-col 2xl:text-center">&quot;I love the insights and reminders.&quot;</p>
                            <span className="text-sm text-[rgb(255,255,255,50%)]"> - Emily Johnson (Sample Testimonial)</span>
                        </div>
                    </div>
                </div>

                <div id="pricing"
                    className="
                    flex flex-col items-center bg-main h-fit py-8
                    "
                >
                    <div
                        className="
                        flex flex-col items-center text-center gap-5
                        lg:flex-row lg:gap-10 xl:gap-20 transition-all
                        "
                    >
                        <div
                            className="
                            size-64 bg-[rgba(255,255,255,0.9)] rounded text-main-dark p-[20px] flex flex-col items-start
                            sm:h-2/3 sm:w-9/12
                            lg:size-72
                            "
                        >
                            <div className="flex flex-col items-start sm:max-lg:items-center sm:max-lg:w-1/2 sm:max-lg:mx-auto">
                                <h2 className="mb-0">Free Plan:</h2>
                                <span className="flex items-end justify-start gap-[10px]">
                                    <h1 className="text-5xl mt-[15px]">$0</h1><p>/month</p>
                                </span>
                            </div>
                            <ul className="pl-[10px] w-10/12 mt-6 mx-auto sm:flex  lg:flex-col lg:gap-3 lg:mt-10">
                                <li>Basic tracking features</li>
                                <li>Email notifications</li>
                                <li>Community support</li>
                            </ul>
                        </div>
                        <div
                            className="
                            size-64 bg-[rgba(255,255,255,0.9)] rounded text-main-dark p-[20px] flex flex-col items-start
                            sm:h-2/3 sm:w-9/12
                            lg:size-72
                            "
                        >
                            <div className="flex flex-col items-start sm:max-lg:items-center sm:max-lg:w-1/2 sm:max-lg:mx-auto">
                                <h2>Pro Plan:</h2>
                                <span className="flex items-end justify-start gap-[10px]">
                                    <h1 className="text-5xl mt-[15px]">$10</h1><p>/month</p>
                                </span>
                            </div>
                            <ul className="pl-[10px] w-10/12 mt-4 mx-auto sm:flex lg:flex-col lg:gap-3 lg:mt-6">
                                <li>All Free features plus</li>
                                <li>Advanced analytics</li>
                                <li>Customizable workflows</li>
                                <li>Priority support</li>
                            </ul>
                        </div>
                        <div
                            className="
                            size-64 bg-[rgba(255,255,255,0.9)] rounded text-main-dark p-[20px] flex flex-col items-start
                            sm:h-2/3 sm:w-9/12
                            lg:size-72
                            "
                        >
                            <div className="flex flex-col items-start sm:max-lg:items-center sm:max-lg:w-1/2 sm:max-lg:mx-auto">
                                <h2>Premium Plan:</h2>
                                <span className="flex items-end justify-start gap-[10px]">
                                    <h1 className="text-5xl mt-[15px]">$25</h1><p>/month</p>
                                </span>
                            </div>
                            <ul className="pl-[10px] w-11/12 mt-2 mx-auto sm:flex lg:flex-col lg:gap-3 lg:mt-6">
                                <li>All Pro features plus</li>
                                <li>One-on-one career coaching</li>
                                <li>Resume and cover letter reviews</li>
                                <li>Dedicated support</li>
                            </ul>
                        </div>
                    </div>
                    <button className="bg-btn-main hover:bg-btn-main-hover mt-8" onClick={handleFutureFeatureClick}>Choose Your Plan</button>
                </div>

                <div className="flex justify-center items-center text-center py-4 md:py-4 transition-all">
                    <p className="text-sm w-9/12 md:text-base lg:text-xl lg:w-7/12 transition-all">ApplySage is dedicated to helping job seekers manage their applications with ease and efficiency.
                        Our mission is to provide smart, insightful tools that support your career journey.</p>
                </div>
            </>
        )
    } else {
        content = (
            // TODO Still needs tailwind conversion
            <>
                <div id="hero_logged_in" className="flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold my-7">Hello {sessionUser.username}!</h1>
                    <input
                        className="font-medium pl-5 bg-[rgb(255,255,255,0.87)]
                            border border-solid border-gray-500 rounded
                                w-clamp-search h-6 mt-0.5"
                        type="search"
                        placeholder="Search for applications" />
                    <button
                        onClick={handleNewApplicationClick}
                        className="bg-btn-main mt-8 py-1 px-4
                            hover:bg-btn-main-hover"
                    >
                        Add Application
                    </button>
                </div>
                <div id="recent_apps" className="flex justify-around bg-main mt-6">
                    <div className="flex justify-center items-center">
                        <h2 className="text-3xl">Recent Applications</h2>
                    </div>
                    <div id="app_card__container" className="flex justify-around text-center items-center">
                        {recent_applications.allIds.map((application_id) => {
                            const application = recent_applications.data[application_id];
                            return (
                                <div
                                    onClick={() => handleRecentAppClick(application_id)}
                                    key={`dash-app-${application_id}`}
                                    className="border border-solid border-alt 
                                    cursor-pointer p-2.5 flex flex-col gap-3
                                    rounded hover:border-[#606060]"
                                >
                                    {/* <img src="/aa-favicon.ico" alt="" /> */}
                                    <h3 className="text-xl font-bold">{application.company.name}</h3>
                                    <p>Position:</p>
                                    <p>{application.title}</p>
                                    <h2 className="text-xl font-bold">Submitted:</h2>
                                    <h2 className="text-xl font-bold">{format(new Date(application.applied_date), 'M/d/yyyy')}</h2>
                                </div>
                            )
                        })}
                        {recent_applications.allIds.length === 0 &&
                            <h2 className="text-2xl">Add some applications and they will show up here!</h2>
                        }
                    </div>
                </div>
                <div id="app_metrics" className="text-center">
                    <h2 className="text-3xl pt-5">Application Metrics</h2>
                    <div>
                        <article className="text-2xl mt-12">Feature will be coming soon :)</article>
                    </div>
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