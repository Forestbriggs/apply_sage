import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
        setError
    } = useForm<LoginFormValues>({
        resolver: yupResolver(schema)
    });
    // console.log(watch())

    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        return dispatch(thunkLogin(data)
        ).then(() => {
            closeModal();
        }).catch((e: any) => {
            if (e.email) {
                setError('email', { type: 'custom', message: e.email })
            }
            if (e.password) {
                setError('password', { type: 'custom', message: e.password })
            }
        })
    };

    const demoLogin = (e: any) => {
        e.preventDefault()
        return dispatch(thunkLogin({
            email: 'demo@aa.io', password: 'password'
        })).then(() => {
            closeModal();
        });
    }

    return (
        <div className="text-center">
            <h1 className="text-3xl mb-2" >Log In</h1>
            <form
                className="flex flex-col justify-start items-center
                            gap-2.5 text-lg"
                onSubmit={handleSubmit(onSubmit)}
            >
                <label htmlFor="email">Email</label>
                <div className="min-h-4" >
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>
                <input
                    className="text-md rounded border border-gray-50
                                border-solid h-6 w-clamp-input"
                    id="email"
                    {...register('email')}
                    aria-invalid={errors.email ? true : false}
                />
                <label htmlFor="password">Password</label>
                <div className="min-h-4">
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
                <div className="flex gap-5">
                    <button className="bg-btn-main hover:bg-btn-main-hover" type="submit" >Log In</button>
                    <button className="bg-cancel-btn hover:bg-cancel-btn-hover" id="demo" onClick={demoLogin}>Demo Login</button>
                </div>
            </form>
        </div>
    );
}

export default LoginFormModal;
