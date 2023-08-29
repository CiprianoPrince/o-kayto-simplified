import { Routes, Route } from 'react-router-dom';
import { AdminLayout, AuthLayout, ShopLayout } from './layout';

import {
    About,
    Account,
    Admin,
    Cart,
    Checkout,
    Shop,
    Contact,
    Home,
    Payment,
    Signin,
    Signup,
    Wishlist,
    Signout,
} from './pages';

import useScrolltoTop from './hooks/useScrolltoTop';

function App() {
    useScrolltoTop();
    return (
        <>
            <Routes>
                <Route path="/" element={<ShopLayout />}>
                    <Route element={<AuthLayout />}>
                        <Route path="signin" element={<Signin />} />
                        <Route path="signup" element={<Signup />} />
                        <Route path="signout" element={<Signout />} />
                    </Route>

                    {/* <Route element={<PersistAuth />}> */}
                    <Route index element={<Home />} />
                    <Route path="shop">
                        <Route index element={<Shop />} />
                        <Route path=":category" element={<Shop />}>
                            <Route path=":slug" element={<Shop />} />
                        </Route>
                    </Route>
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="wishlist" element={<Wishlist />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="payment" element={<Payment />} />
                    <Route path="settings" element={<Account />} />
                </Route>
                {/* </Route> */}

                <Route element={<AdminLayout />}>
                    <Route path="admin" element={<Admin />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
