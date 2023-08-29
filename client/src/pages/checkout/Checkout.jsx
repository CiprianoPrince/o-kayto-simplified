import { example } from '../../assets/images/products';
import { BreadCrumb } from '../../components/ui';
import { Link } from 'react-router-dom';

const Checkout = () => {
    return (
        <main>
            <section className="container mx-auto px-4 py-8">
                <div className="">
                    <BreadCrumb>
                        <BreadCrumb.Item to="/">Home</BreadCrumb.Item>
                        <BreadCrumb.Item to="/cart">Cart</BreadCrumb.Item>
                        <BreadCrumb.Item to="/checkout">Checkout</BreadCrumb.Item>
                        <BreadCrumb.Item to="/payment" isDisabled>
                            Payment
                        </BreadCrumb.Item>
                    </BreadCrumb>
                </div>

                <div className="flex flex-col lg:flex-row">
                    <div className="basis-7/12 px-2 py-4 lg:px-4 lg:py-6 2xl:basis-8/12">
                        <div className="flex flex-row items-center justify-between">
                            <h1 className="header-2">Checkout</h1>
                        </div>

                        <hr className="my-4 h-px rounded-xl border-0 bg-secondary-900/30" />

                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-row items-center justify-between">
                                <h2 className="header-4 | text-sm text-secondary-700">
                                    Your shipping information
                                </h2>
                            </div>

                            <div className="flex flex-row gap-4">
                                <div className="flex-1">
                                    <label className="form-label | block" htmlFor="email">
                                        First name
                                    </label>
                                    <input
                                        className="form-control | px-3 py-2"
                                        type="text"
                                        name="firstName"
                                        placeholder="Enter your first name"
                                    />
                                </div>

                                <div className="flex-1">
                                    <label className="form-label | block" htmlFor="email">
                                        Last name
                                    </label>
                                    <input
                                        className="form-control | px-3 py-2"
                                        type="text"
                                        name="lastName"
                                        placeholder="Enter your last name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="form-label | block" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="form-control | px-3 py-2"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            <div>
                                <label className="form-label | block" htmlFor="email">
                                    Phone number
                                </label>
                                <input
                                    className="form-control | px-3 py-2"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            <div>
                                <label className="form-label | block" htmlFor="email">
                                    Street number and house number
                                </label>
                                <input
                                    className="form-control | px-3 py-2"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your street number and house number"
                                />
                            </div>

                            <div className="flex flex-row gap-4">
                                <div className="flex-1">
                                    <label className="form-label | block" htmlFor="email">
                                        City
                                    </label>
                                    <input
                                        className="form-control | px-3 py-2"
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="City"
                                    />
                                </div>

                                <div className="flex-1">
                                    <label className="form-label | block" htmlFor="email">
                                        Region
                                    </label>
                                    <input
                                        className="form-control | px-3 py-2"
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Region"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="form-label | block" htmlFor="email">
                                    Postal code
                                </label>
                                <input
                                    className="form-control | px-3 py-2"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your postal code"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="basis-5/12 rounded-lg p-8 font-medium shadow-xl ring-1 ring-secondary-500/5 lg:self-start 2xl:basis-4/12">
                        <div className="flex flex-col space-y-6">
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row gap-2 md:gap-4">
                                    <img
                                        className="rounded-lg"
                                        src={example}
                                        alt="example"
                                        width={100}
                                    />
                                    <div className="flex flex-col py-2">
                                        <p className="font-medium text-secondary-600">Cardingan</p>
                                        <p className="font-medium text-secondary-600">Green | M</p>
                                    </div>
                                </div>

                                <div className="my-auto">
                                    <p className="text-base font-medium leading-normal text-secondary-600">
                                        &#8369;1,000.00
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-row justify-between">
                                <span className="text-secondary-400">Subtotal</span>
                                <span className="text-secondary-600">&#8369;0</span>
                            </div>

                            <div className="flex flex-row justify-between">
                                <span className="text-secondary-400">Discount</span>
                                <span className="text-secondary-600">&#8369;0</span>
                            </div>

                            <div className="flex flex-row justify-between">
                                <span className="text-secondary-400">Shipment</span>
                                <span className="text-secondary-600">&#8369;0</span>
                            </div>

                            <hr className="my-8 h-px rounded-xl border-0 bg-secondary-900/30" />

                            <div className="flex flex-row justify-between">
                                <span className="text-secondary-500">Grand Total</span>
                                <span className="text-secondary-600">&#8369;0</span>
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row-reverse lg:flex-col">
                                <Link
                                    className="button | |  w-full flex-1 bg-secondary-950 text-center text-lg font-bold hover:bg-secondary-800 focus:bg-secondary-700 active:bg-secondary-700"
                                    to="/payment"
                                >
                                    Continue to payment
                                </Link>

                                <div className="flex-1 text-center">
                                    <p className="text-secondary-600">
                                        <Link
                                            className="text-center text-accent-500 hover:text-accent-700"
                                            to="/cart"
                                        >
                                            Back to cart
                                        </Link>{' '}
                                        or{' '}
                                        <Link
                                            className="text-center text-accent-500 hover:text-accent-700"
                                            to="/"
                                        >
                                            Continue shopping
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Checkout;
