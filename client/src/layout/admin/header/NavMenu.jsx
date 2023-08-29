import { NavLink } from 'react-router-dom';

const NavMenu = () => {
    return (
        <nav className="[ ] hidden lg:block" aria-label="main">
            <ul className="flex items-center justify-center space-x-4">
                <li className="text-lg font-semibold">
                    <NavLink to="shop" className="block px-3 py-1">
                        Shop
                    </NavLink>
                </li>

                <li className="text-lg font-semibold">
                    <NavLink to="shop" className="block px-3 py-1">
                        Most Wanted
                    </NavLink>
                </li>

                <li className="text-lg font-semibold">
                    <NavLink to="shop" className="block px-3 py-1">
                        New Arrival
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavMenu;
