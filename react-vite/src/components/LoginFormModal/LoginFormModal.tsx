import { JSX } from "react";
import { thunkLogin } from "../../redux/session";
import { useAppDispatch } from "../../redux/hooks";
import { useModal } from "../../context/Modal";
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ImSpinner2 } from "react-icons/im";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const schema = yup
    .object({
        email: yup.string().email('Invalid email address').required('Email is a required field'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
    });

type LoginFormValues = {
    email: string;
    password: string;
}

function LoginFormModal(): JSX.Element {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();
    const [demoLoading, setDemoLoading] = useState(false);

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors, isSubmitting },
        setError
    } = useForm<LoginFormValues>({
        resolver: yupResolver(schema)
    });
    // console.log(watch())

    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        try {
            await dispatch(thunkLogin(data));
            navigate('/');
            closeModal();
        } catch (e: any) {
            if (e.email) {
                setError('email', { type: 'custom', message: e.email })
            }
            if (e.password) {
                setError('password', { type: 'custom', message: e.password })
            }
        }
    };

    const demoLogin = async (e: any) => {
        e.preventDefault();
        setDemoLoading(true);
        try {
            await dispatch(thunkLogin({
                email: 'demo@aa.io', password: 'password'
            }));
            navigate('/');
            closeModal();
        } finally {
            setDemoLoading(false);
        }

    }

    return (
        <div className="text-center">
            <h1 className="text-3xl mb-2" >Log In</h1>
            <form
                className="flex flex-col justify-start items-start
                            gap-2.5 text-lg"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex w-full justify-between items-center">
                    <label htmlFor="email">Email</label>
                    {errors.email && <p className="text-sm text-red-500 m-0">{errors.email.message}</p>}
                </div>
                <input
                    className="text-md rounded border border-gray-50
                                border-solid h-6 w-clamp-input"
                    id="email"
                    {...register('email')}
                    aria-invalid={errors.email ? true : false}
                />
                <div className="flex w-full justify-between items-center">
                    <label htmlFor="password">Password</label>
                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                </div>
                <input
                    className="text-md rounded border border-gray-50
                                border-solid h-6 w-clamp-input"
                    id="password"
                    type="password"
                    {...register('password')}
                    aria-invalid={errors.password ? true : false}
                />
                <div className="flex gap-5 self-center mt-3">
                    <button
                        className="bg-btn-main hover:bg-btn-main-hover"
                        type="submit"
                        disabled={isSubmitting || demoLoading}
                    >
                        {
                            isSubmitting ? (
                                <div className="flex items-center gap-1.5"><ImSpinner2 className="animate-spin" /><p>Loading</p></div>
                            ) : 'Log In'
                        }
                    </button>
                    <button
                        className="bg-cancel-btn hover:bg-cancel-btn-hover"
                        id="demo"
                        onClick={demoLogin}
                        disabled={demoLoading || isSubmitting}
                    >
                        {
                            demoLoading ? (
                                <div className="flex items-center gap-1.5"><ImSpinner2 className="animate-spin" /><p>Loading</p></div>
                            ) : 'Demo Login'
                        }
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginFormModal;
