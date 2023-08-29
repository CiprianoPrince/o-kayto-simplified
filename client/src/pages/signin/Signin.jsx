import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSigninMutation } from '../../features/auth/authApiSlice';
import { setCredentials } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const schema = z.object({
    email: z
        .string()
        .email('Please enter a valid email address.')
        .transform((val) => val.trim()),

    password: z
        .string()
        .min(8, 'Password should be at least 8 characters long.')
        .refine(
            (password) => /[A-Z]/.test(password),
            'Password should contain at least one uppercase letter.'
        )
        .refine(
            (password) => /[a-z]/.test(password),
            'Password should contain at least one lowercase letter.'
        )
        .refine(
            (password) => /[0-9]/.test(password),
            'Password should contain at least one number.'
        )
        .transform((val) => val.trim()),
});

const Signin = () => {
    const { register, handleSubmit, formState, reset } = useForm({
        resolver: zodResolver(schema),
    });
    const { errors } = formState;
    const [signin, { isLoading }] = useSigninMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFormData = async (formData, event) => {
        try {
            const result = await signin(formData).unwrap();
            dispatch(setCredentials(result));
            event.target.reset();
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main>
            <section className="container mx-auto flex min-h-screen items-center justify-center px-4 py-4">
                <div className="w-full max-w-lg rounded-lg p-8 shadow-xl ring-1 ring-inset ring-secondary-900/5">
                    <h1 className="header-1 text-center">O-kayto Login</h1>

                    <p className="mb-4 text-center font-semibold text-secondary-950">
                        New here?{' '}
                        <Link
                            className="[ ] text-accent-500 hover:text-accent-800 focus:outline-none focus:ring-2 focus:ring-accent-500"
                            to="/signup"
                        >
                            Create an account.
                        </Link>
                    </p>

                    <form
                        className="flex flex-col space-y-4"
                        onSubmit={handleSubmit(handleFormData)}
                    >
                        <div>
                            <label className="form-label | block" htmlFor="email">
                                Email address
                            </label>
                            <input
                                className="form-control | px-3 py-2"
                                {...register('email')}
                                type="email"
                                id="email"
                                placeholder="Enter your registered email"
                            />
                            <span className="text-xs text-rose-600">{errors?.email?.message}</span>
                        </div>

                        <div>
                            <label className="form-label | block" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="form-control | px-3 py-2"
                                {...register('password')}
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                            />
                            <span className="text-xs text-rose-600">
                                {errors?.password?.message}
                            </span>
                        </div>

                        <div>
                            <button
                                className="button | w-full py-4 text-4xl font-bold"
                                type="submit"
                            >
                                Log in
                            </button>
                        </div>

                        <div className="text-center">
                            <Link className="[ ] inline-block font-semibold text-secondary-500 hover:text-accent-800 focus:outline-none focus:ring-2 focus:ring-accent-500">
                                Forgot password?
                            </Link>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Signin;
