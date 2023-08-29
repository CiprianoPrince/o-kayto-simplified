import { NavLink } from 'react-router-dom';
import { DropDownContainer } from '../../../components/ui';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../../features/auth/authSlice';

const Bars3Menu = () => {
    const accessToken = useSelector(selectAccessToken);
    return (
        <DropDownContainer>
            <NavLink to="shop" className="block rounded-lg px-3 py-1 hover:bg-primary-100/50">
                Shop
            </NavLink>
            <NavLink
                to="most-wanted"
                className="block rounded-lg px-3 py-1 hover:bg-primary-100/50"
            >
                Most Wanted
            </NavLink>
            <NavLink
                to="new-arrival"
                className="block rounded-lg px-3 py-1 hover:bg-primary-100/50"
            >
                New Arrival
            </NavLink>

            {!accessToken ? (
                <>
                    <NavLink
                        className="block rounded-lg px-3 py-1 hover:bg-primary-100/50"
                        to="signin"
                    >
                        Sign in
                    </NavLink>
                    <NavLink
                        className="block rounded-lg px-3 py-1 hover:bg-primary-100/50"
                        to="signup"
                    >
                        Sign up
                    </NavLink>
                </>
            ) : (
                <>
                    <NavLink
                        className="block rounded-lg px-3 py-1 hover:bg-primary-100/50"
                        to="account"
                    >
                        Account
                    </NavLink>
                    <NavLink
                        className="block rounded-lg px-3 py-1 hover:bg-primary-100/50"
                        to="signout"
                    >
                        Logout
                    </NavLink>
                </>
            )}
        </DropDownContainer>
    );
};

export default Bars3Menu;
