import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrolltoTop = () => {
    const { pathname, search } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname, search]);
};

export default useScrolltoTop;
