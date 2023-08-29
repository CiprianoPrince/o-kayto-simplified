import { Link } from 'react-router-dom';
import CategoryLinkList from './sections/CategoryLinkList';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Admin = () => {
    return (
        <>
            <main>
                <section className="container mx-auto space-y-4 px-4 py-8">
                    <div className="flex flex-row gap-4 lg:flex-row lg:gap-6">
                        <div className="hidden basis-3/12 space-y-4 self-start rounded-lg border p-4 shadow-lg lg:block">
                            <Link
                                className="flex w-full flex-row items-center justify-between rounded-md bg-primary-100 px-4 py-3 text-start text-lg font-medium capitalize text-secondary-500 hover:bg-primary-200 hover:text-secondary-600 focus:bg-primary-300 focus:text-secondary-700 active:bg-primary-300 active:text-secondary-700 "
                                type="button"
                                to="?category"
                            >
                                Category{' '}
                                <ChevronDownIcon className="ms-auto inline-block h-6 w-6" />
                            </Link>

                            <div className="flex flex-col gap-4 px-4">
                                <CategoryLinkList />
                            </div>
                        </div>

                        <div className="space-y-8 lg:basis-9/12">
                            <form className="flex flex-col space-y-4" encType="multipart/form-data">
                                <div className="flex flex-col gap-4 md:flex-row">
                                    <div className="flex-1">
                                        <label className="form-label | block" htmlFor="firstName">
                                            First name
                                        </label>
                                        <input
                                            className="form-control | px-3 py-2"
                                            type="text"
                                            id="firstName"
                                            placeholder="Your first name"
                                            value="Prince"
                                        />
                                        <span className="text-xs text-rose-600"></span>
                                    </div>

                                    <div className="flex-1">
                                        <label className="form-label | block" htmlFor="lastName">
                                            Last name
                                        </label>
                                        <input
                                            className="form-control | px-3 py-2"
                                            type="text"
                                            id="lastName"
                                            placeholder="Your last name"
                                            value="Cipriano"
                                        />
                                        <span className="text-xs text-rose-600"></span>
                                    </div>
                                </div>

                                <div>
                                    <label className="form-label | block" htmlFor="email">
                                        Email address
                                    </label>
                                    <input
                                        className="form-control | px-3 py-2"
                                        type="email"
                                        id="email"
                                        placeholder="Your email address"
                                        value="dog@gmail.com"
                                    />
                                    <span className="text-xs text-rose-600"></span>
                                </div>

                                <div>
                                    <label className="form-label | block" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        className="form-control | px-3 py-2"
                                        type="password"
                                        id="password"
                                        placeholder="Create your password"
                                        value="Password69"
                                    />
                                    <span className="text-xs text-rose-600"></span>
                                </div>

                                <div>
                                    <label className="form-label | block" htmlFor="confirmPassword">
                                        Confirm password
                                    </label>
                                    <input
                                        className="form-control | px-3 py-2"
                                        type="password"
                                        id="confirmPassword"
                                        placeholder="Confirm your password"
                                        value="Password69"
                                    />
                                    <span className="text-xs text-rose-600"></span>
                                </div>

                                <div>
                                    <button
                                        className="button | w-full py-4 text-2xl font-bold"
                                        type="submit"
                                        id="submit"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Admin;
