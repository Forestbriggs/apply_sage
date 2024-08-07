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

                </div>
                <div id="pricing">

                </div>
                <div id="mission">
                    <p>ApplySage is dedicated to helping job seekers manage their applications with ease and efficiency.
                        Our mission is to provide smart, insightful tools that support your career journey.</p>
                </div>
            </>
        )
    } else {
        content = (
            <div id="hero">
                < p >logged in</p >
            </div >
        )
    }



    return content;
}