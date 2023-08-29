import { Link } from 'react-router-dom';

import { Bars3Icon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline';
import ShoppingBagMenu from './ShoppingBagMenu';

import { okaytoLogo } from '../../../assets/images';
import UserMenu from './UserMenu';
import Bars3Menu from './Bars3Menu';
import NavMenu from './NavMenu';
import SearchBar from './SearchBar';

const Header = () => {
    return (
        <>
            <header className="sticky top-0 z-10 border-b-2 bg-primary-50 text-secondary-800 shadow-lg">
                <div className="| container mx-auto flex items-center justify-between p-4">
                    <div className="group relative block w-10 p-0 lg:hidden lg:w-12 lg:py-2">
                        <Bars3Icon
                            className="group peer text-accent-300 hover:text-accent-500"
                            role="button"
                        />

                        <div className="bg-white-100 peer absolute -left-[25%] top-[100%] z-10 hidden w-80 rounded-md group-hover:block group-focus:block group-active:block peer-hover:block peer-focus:block peer-active:block">
                            <Bars3Menu />
                        </div>
                    </div>

                    <Link className="w-[8rem]" to="/">
                        <img className="" src={okaytoLogo} alt="" />
                    </Link>

                    <NavMenu />

                    <div className="flex max-w-sm items-center justify-end gap-4 lg:w-full">
                        <SearchBar inputGroupClass="hidden [ lg:flex ]" />
                        <div className="group relative w-10 p-0 lg:w-12 lg:py-2">
                            <ShoppingBagIcon
                                className="group peer text-accent-500 hover:text-accent-400 focus:outline-none"
                                role="button"
                                tabIndex="0"
                            />

                            <div className="bg-white-100 peer  absolute -right-[25%] top-[100%] z-10 hidden w-80 rounded-md group-hover:block peer-hover:block">
                                <ShoppingBagMenu />
                            </div>
                        </div>

                        <div className="group relative hidden w-10 p-0 lg:block lg:w-12 lg:py-2">
                            <UserIcon
                                className="group peer text-accent-500 hover:text-accent-400 focus:outline-none"
                                role="button"
                                tabIndex="0"
                            />

                            <div className="bg-white-100 peer  absolute -right-[25%] top-[100%] z-10 hidden w-80 rounded-md group-hover:block peer-hover:block">
                                <UserMenu />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="| container mx-auto flex items-center justify-center p-4 lg:hidden">
                    <SearchBar />
                </div>
            </header>
        </>
    );
};

export default Header;
