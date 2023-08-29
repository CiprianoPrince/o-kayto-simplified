import { NavLink } from 'react-router-dom';
import { DropDownContainer } from '../../../components/ui';

const ShoppingBagMenu = () => {
    return (
        <DropDownContainer>
            <NavLink className="[ ] block rounded-lg px-3 py-1 hover:bg-primary-100/50" to="/cart">
                Cart
            </NavLink>
            <NavLink className="[ ] block rounded-lg px-3 py-1 hover:bg-primary-100/50">
                Collection
            </NavLink>
            <NavLink className="[ ] block rounded-lg px-3 py-1 hover:bg-primary-100/50">
                Collection
            </NavLink>
        </DropDownContainer>
    );
};

export default ShoppingBagMenu;
