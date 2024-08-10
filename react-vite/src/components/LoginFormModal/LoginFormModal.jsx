import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(
            thunkLogin({
                email,
                password,
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            closeModal();
        }
    };

    const demoLogin = () => {
        setErrors({})
        return dispatch(thunkLogin({
            email: 'demo@aa.io', password: 'password'
        })).then(() => {
            closeModal();
        });
    }

    return (
        <div id="login_signup__container">
            <h1>Log In</h1>
            <form>
                <div className="error__container">
                    {errors.email && <p className="errors">{errors.email}</p>}
                    {/* {errors.password && <p>{errors.password}</p>} */}
                </div>
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <div id="button__container">
                    <button onClick={handleSubmit}>Log In</button>
                    <button id="demo" onClick={demoLogin}>Demo Login</button>
                </div>
            </form>
        </div>
    );
}

export default LoginFormModal;
