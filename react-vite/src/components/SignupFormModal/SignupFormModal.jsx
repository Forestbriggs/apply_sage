import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";

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
            <div className="text-center">

                <h1 className="text-3xl mb-2">Sign Up</h1>
                <div className="error__container">
                    {errors.server && <p>{errors.server}</p>}
                </div>
                <form
                    className="flex flex-col justify-start items-center 
                    gap-2.5 text-lg"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="email">Email</label>
                    <div className="min-h-4">
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>
                    <input
                        id="email"
                        className="text-md rounded border border-gray-50 
                        border-solid h-6 w-clamp-input"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="username">Username</label>
                    <div className="min-h-4">
                        {errors.username && <p className="text-sm tet-red-500">{errors.username}</p>}
                    </div>
                    <input
                        id="username"
                        className="text-md rounded border border-gray-50 
                        border-solid h-6 w-clamp-input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <div className="min-h-4">
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>
                    <input
                        id="password"
                        className="text-md rounded border border-gray-50 
                        border-solid h-6 w-clamp-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <div className="min-h-4">
                        {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                    </div>
                    <input
                        id="confirm-password"
                        className="text-md rounded border border-gray-50 
                        border-solid h-6 w-clamp-input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button className="bg-btn-main hover:bg-btn-main-hover" type="submit">Sign Up</button>
                </form>
            </div>
        </>
    );
}

export default SignupFormModal;
