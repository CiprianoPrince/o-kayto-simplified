import { apiSlice } from '../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signin: builder.mutation({
            query: (credentials) => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        signup: builder.mutation({
            query: (credentials) => ({
                url: '/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: '/refresh',
                method: 'GET',
            }),
        }),
        signout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'GET',
            }),
        }),
    }),
});

export const { useSigninMutation, useSignupMutation, useRefreshTokenMutation, useSignoutMutation } =
    authApiSlice;
