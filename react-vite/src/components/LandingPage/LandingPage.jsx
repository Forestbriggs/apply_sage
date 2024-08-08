import { useSelector } from "react-redux";
import OpenModalButton from '../OpenModalButton';
import './LandingPage.css';
import SignupFormModal from "../SignupFormModal";

export default function LandingPage() {
    const sessionUser = useSelector(state => state.session.user);

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
                            <button id="learn_more">LearnMore</button>
                        </div>
                    </div>
                </div>
                <div id="features">
                    <div className="feature_card">
                        <img src="/favicon.ico" alt="" />
                        <strong>Tracking and Management</strong>
                        <p className="feature_quote">
                            &quot;Keep all your job applications in one place and never miss a follow up.&quot;
                        </p>
                    </div>
                    <div className="feature_card">
                        <img src="/favicon.ico" alt="" />
                        <strong>Notifications and Reminders</strong>
                        <p className="feature_quote">
                            &quot;Receive timely reminders for application deadlines and follow-ups.&quot;
                        </p>
                    </div>
                    <div className="feature_card">
                        <img src="/favicon.ico" alt="" />
                        <strong>Analytics and Insight</strong>
                        <p className="feature_quote">
                            &quot;Gain insights into your application progress and success rates.&quot;
                        </p>
                    </div>
                    <div className="feature_card">
                        <img src="/favicon.ico" alt="" />
                        <strong>Customizable Workflows</strong>
                        <p className="feature_quote">
                            &quot;Tailor the application process to fit your unique job search strategy.&quot;
                        </p>
                    </div>
                </div>
                <div id="testimonies">
                    <div>
                        <img src="/favicon.ico" alt="" />
                        <p>&quot;ApplySage helped me land my dream job!&quot; - Jane Doe</p>
                    </div>
                    <div>
                        <img src="/favicon.ico" alt="" />
                        <p>&quot;The best tool for managing job applications!&quot; - John Smith</p>
                    </div>
                    <div>
                        <img src="/favicon.ico" alt="" />
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
                    <button>Choose Your Plan</button>
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
                    <button>Add Application</button>
                </div>
                <div id="recent_apps">
                    <div id="recent_apps_title">
                        <h2>Recent Applications</h2>
                    </div>
                    <div id="#app_card__container">
                        {/* TODO grab 2 most recent applications from db and return their data
                            (make dashboard route that will return those and analytics)
                        */}
                        <div id="card_one">
                            <img src="/favicon.ico" alt="" />
                            <strong>Tracking and Management</strong>
                            <p className="feature_quote">
                                &quot;Keep all your job applications in one place and never miss a follow up.&quot;
                            </p>
                        </div>
                        <div id="card_two">
                            <img src="/favicon.ico" alt="" />
                            <strong>Tracking and Management</strong>
                            <p className="feature_quote">
                                &quot;Keep all your job applications in one place and never miss a follow up.&quot;
                            </p>
                        </div>
                    </div>
                </div>
                <div id="app_metrics">
                    <h2>Application Metrics</h2>
                </div>
            </>
        )
    }



    return content;
}