import { example } from '../../assets/images/products';
import { CheckIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

import { Link } from 'react-router-dom';
import { BreadCrumb } from '../../components/ui';
import { useGetCartQuery } from '../../features/user/userSlice';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../features/auth/authSlice';
import jwtDecode from 'jwt-decode';

const Cart = () => {
    // const token = useSelector(selectAccessToken);
    // const userInfo = jwtDecode(token);
    // const { data: carts, isLoading, isSuccess, isError, error } = useGetCartQuery(userInfo?.userID);

    // let content;
    // if (isLoading) {
    //     content = 
    // }
    return (
        <main>
            <section className="container mx-auto px-4 py-8">
                <div className="">
                    <BreadCrumb>
                        <BreadCrumb.Item to="/">Home</BreadCrumb.Item>
                        <BreadCrumb.Item to="/cart">Cart</BreadCrumb.Item>
                        <BreadCrumb.Item to="/checkout" isDisabled>
                            Checkout
                        </BreadCrumb.Item>
                        <BreadCrumb.Item to="/payment" isDisabled>
                            Payment
                        </BreadCrumb.Item>
                    </BreadCrumb>
                </div>

                <div className="flex flex-col lg:flex-row">
                    <div className="basis-8/12 divide-y px-2 py-4 lg:px-4 lg:py-6 2xl:basis-9/12">
                        <div className="flex flex-row items-center justify-between">
                            <h2 className="header-2">Cart</h2>
                            <button className="font-medium text-secondary-600">
                                <TrashIcon className="mb-1 inline h-4 w-4" />
                                Remove
                            </button>
                        </div>

                        <div className="hidden items-center md:flex">
                            <div className="relative basis-1/12 px-3 py-2 text-center">
                                <input
                                    className="peer mb-1 h-4 w-4 appearance-none rounded-md bg-accent-50 align-middle ring-2 ring-accent-300 checked:bg-transparent hover:ring-accent-500"
                                    type="checkbox"
                                />
                                <CheckIcon className="absolute left-1/2 top-1/2 -z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 stroke-[5px] text-accent-400 peer-checked:block" />
                            </div>

                            <div className="basis-6/12 px-3 py-2 text-start">
                                <span className="font-semibold uppercase text-secondary-500/80">
                                    Product
                                </span>
                            </div>

                            <div className="basis-3/12 px-3 py-2 text-center">
                                <span className="font-semibold uppercase text-secondary-500/80">
                                    Quantity
                                </span>
                            </div>

                            <div className="basis-2/12 px-3 py-2 text-center">
                                <span className="font-semibold uppercase text-secondary-500/80">
                                    Price
                                </span>
                            </div>
                        </div>

                        {/* cart items */}
                        <div className="grid grid-cols-12 items-center">
                            <div className="relative col-span-2 px-3 py-2 text-center md:col-span-1">
                                <input
                                    className="peer mb-1 h-4 w-4 appearance-none rounded-md bg-accent-50 align-middle ring-2 ring-accent-300 checked:bg-transparent hover:ring-accent-500"
                                    type="checkbox"
                                />
                                <CheckIcon className="absolute left-1/2 top-1/2 -z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 stroke-[5px] text-accent-400 peer-checked:block" />
                            </div>

                            <div className="col-span-10 shrink-0 px-3 py-2 text-start md:col-span-6">
                                <div className="flex flex-row gap-4">
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
                            </div>

                            <div className="col-span-8 space-y-4 px-3 py-2 text-center md:col-span-3">
                                <div className="input-group |group justify-center">
                                    <span
                                        className="input-group-text | group bg-transparent hover:bg-accent-500"
                                        tabIndex="0"
                                    >
                                        <MinusIcon
                                            className="h-6 w-6 text-accent-500 group-hover:text-primary-50"
                                            role="button"
                                        />
                                    </span>
                                    <input
                                        className="form-control | peer w-full max-w-[5rem] text-center focus:ring-accent-500"
                                        type="number"
                                        value={1}
                                    />

                                    <span
                                        className="input-group-text | group bg-transparent hover:bg-accent-500"
                                        tabIndex="0"
                                    >
                                        <PlusIcon
                                            className="h-6 w-6 text-accent-500 group-hover:text-primary-50"
                                            role="button"
                                        />
                                    </span>
                                </div>
                                <button className="font-medium text-secondary-600">
                                    <TrashIcon className="mb-1 inline h-4 w-4" />
                                    Remove
                                </button>
                            </div>

                            <div className="col-span-4 px-3 py-2 text-center md:col-span-2">
                                <span className="text-xl font-medium leading-normal text-secondary-600">
                                    &#8369;1,000.00
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="basis-4/12 rounded-lg p-8 font-medium shadow-xl ring-1 ring-secondary-500/5 lg:self-start 2xl:basis-3/12">
                        <div className="flex flex-col space-y-6">
                            <div className="flex flex-row justify-between">
                                <span className="text-secondary-400">Subtotal</span>
                                <span className="text-secondary-600">&#8369;0</span>
                            </div>

                            <div className="flex flex-row justify-between">
                                <span className="text-secondary-400">Discount</span>
                                <span className="text-secondary-600">&#8369;0</span>
                            </div>

                            <hr className="my-8 h-px rounded-xl border-0 bg-secondary-900/30" />

                            <div className="flex flex-row justify-between">
                                <span className="text-secondary-500">Grand Total</span>
                                <span className="text-secondary-600">&#8369;0</span>
                            </div>

                            <div className="[ xs:flex-col ] flex flex-col gap-4 sm:flex-row-reverse lg:flex-col">
                                <Link
                                    className="button | w-full flex-1 bg-secondary-950 text-center text-lg font-bold hover:bg-secondary-800 focus:bg-secondary-700 active:bg-secondary-700"
                                    to="/checkout"
                                >
                                    Checkout now
                                </Link>

                                <Link className="flex-1 text-center text-accent-500" to="/">
                                    Continue shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Cart;
