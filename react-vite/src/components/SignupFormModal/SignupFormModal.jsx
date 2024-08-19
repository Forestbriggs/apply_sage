import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setErrors({
                confirmPassword:
                    "Confirm Password field must be the same as the Password field",
            });
        }

        return dispatch(
            thunkSignup({
                email,
                username,
                password,
            })
        ).then(() => {
            closeModal();
        }).catch((e) => {
            setErrors(e);
        });
    };

    return (
        <>
            <div id="login_signup__container">

                <h1>Sign Up</h1>
                <div className="error__container">
                    {errors.server && <p>{errors.server}</p>}
                </div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Email<span>{errors.email && <p className="errors">{errors.email}</p>}</span>
                    </label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>
                        Username
                        {errors.username && <p>{errors.username}</p>}
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label>
                        Password
                    </label>
                    {errors.password && <p>{errors.password}</p>}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label>
                        Confirm Password
                        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </>
    );
}

export default SignupFormModal;
