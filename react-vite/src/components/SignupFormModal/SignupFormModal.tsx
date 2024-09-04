import { JSX } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const schema = yup
    .object({
        email: yup.string().email("Invalid email address").required("Email is a required field"),
        username: yup.string().required("Username is a required field"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        confirmPassword: yup.string().required("Passwords must match").oneOf([yup.ref("password")], "Passwords must match")
    });

type SignupFormValues = {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

function SignupFormModal(): JSX.Element {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur'
    });

    const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
        try {
            await dispatch(thunkSignup(data));
            navigate('/');
            closeModal();
        } catch (e: any) {
            if (e.email) {
                setError('email', { type: 'custom', message: e.email })
            }
            if (e.username) {
                setError('username', { type: 'custom', message: e.username })
            }
            if (e.password) {
                setError('password', { type: 'custom', message: e.password })
            }
            if (e.confirmPassword) {
                setError('confirmPassword', { type: 'custom', message: e.confirmPassword })
            }
        }
    }

    return (
        <>
            <div className="text-center">

                <h1 className="text-3xl mb-2">Sign Up</h1>
                <form
                    className="flex flex-col justify-start items-center
                    gap-2.5 text-lg"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex w-full justify-between items-center">
                        <label htmlFor="email">Email <span className='required'>*</span></label>
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                    <input
                        id="email"
                        className="text-md rounded border border-gray-50
                        border-solid h-6 w-clamp-input"
                        type="text"
                        {...register('email')}
                        aria-invalid={errors.email ? true : false}
                    />
                    <div className="flex w-full justify-between items-center">
                        <label htmlFor="username">Username <span className='required'>*</span></label>
                        {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
                    </div>
                    <input
                        id="username"
                        className="text-md rounded border border-gray-50
                        border-solid h-6 w-clamp-input"
                        type="text"
                        {...register('username')}
                        aria-invalid={errors.username ? true : false}
                    />
                    <div className="flex w-full justify-between items-center">
                        <label htmlFor="password">Password <span className='required'>*</span></label>
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </div>
                    <input
                        id="password"
                        className="text-md rounded border border-gray-50
                        border-solid h-6 w-clamp-input"
                        type="password"
                        {...register('password')}
                        aria-invalid={errors.password ? true : false}
                    />
                    <div className="flex w-full justify-between items-center">
                        <label htmlFor="confirm-password">Confirm Password <span className='required'>*</span></label>
                        {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
                    </div>
                    <input
                        id="confirm-password"
                        className="text-md rounded border border-gray-50 
                        border-solid h-6 w-clamp-input"
                        type="password"
                        {...register('confirmPassword')}
                        aria-invalid={errors.confirmPassword ? true : false}
                    />
                    <button className="bg-btn-main hover:bg-btn-main-hover mt-2" type="submit" disabled={isSubmitting}>
                        {
                            isSubmitting ? (
                                <div className="flex items-center gap-1.5"><ImSpinner2 className="animate-spin" /><p>Loading</p></div>
                            ) : 'Sign Up'
                        }
                    </button>
                </form>
            </div>
        </>
    );
}

export default SignupFormModal;
