import { useRefreshTokenQuery } from '../features/auth/authApiSlice';

const useRefreshToken = () => {
    const {
        data: { refreshToken },
    } = useRefreshTokenQuery();
    return refreshToken;
};

export default useRefreshToken;
