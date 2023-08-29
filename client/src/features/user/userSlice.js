import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

// Users Entity Adapter
const usersAdapter = createEntityAdapter({
    selectId: (user) => user.userID,
    // Add any sorting logic if needed
});

const initialUsersState = usersAdapter.getInitialState();

export const extendedUsersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // User Endpoints
        getUsers: builder.query({
            query: () => '/api/users',
        }),
        getUserById: builder.query({
            query: (userID) => `/api/users/${userID}`,
        }),
        createUser: builder.mutation({
            query: (newUser) => ({
                url: '/api/users',
                method: 'POST',
                body: newUser,
            }),
        }),
        updateUser: builder.mutation({
            query: (user) => ({
                url: `/api/users/${user.userID}`,
                method: 'PUT',
                body: user,
            }),
        }),
        updateUserComplete: builder.mutation({
            query: (user) => ({
                url: `/api/users/complete/${user.userID}`,
                method: 'PUT',
                body: user,
            }),
        }),
        deleteUser: builder.mutation({
            query: (userID) => ({
                url: `/api/users/${userID}`,
                method: 'DELETE',
            }),
        }),

        // User Cart Endpoints
        getCart: builder.query({
            query: (userID) => `/api/users/${userID}/cart`,
        }),
        createCartItem: builder.mutation({
            query: ({ userID, cartItem }) => ({
                url: `/api/users/${userID}/cart`,
                method: 'POST',
                body: cartItem,
            }),
        }),
        updateCartItem: builder.mutation({
            query: (cartDetail) => ({
                url: `/api/users/${cartDetail.userID}/cart/${cartDetail.cartDetailID}`,
                method: 'PUT',
                body: cartDetail,
            }),
        }),
        deleteCartItem: builder.mutation({
            query: ({ userID, cartDetailID }) => ({
                url: `/api/users/${userID}/cart/${cartDetailID}`,
                method: 'DELETE',
            }),
        }),

        // User Wishlist Endpoints
        getWishlist: builder.query({
            query: (userID) => `/api/users/${userID}/wishlist`,
        }),
        createWishlistItem: builder.mutation({
            query: (wishlistItem) => ({
                url: `/api/users/${wishlistItem.userID}/wishlist`,
                method: 'POST',
                body: wishlistItem,
            }),
        }),
        deleteWishlistItem: builder.mutation({
            query: ({ userID, wishlistDetailID }) => ({
                url: `/api/users/${userID}/wishlist/${wishlistDetailID}`,
                method: 'DELETE',
            }),
        }),

        // User Payment Method Endpoints
        getPaymentMethods: builder.query({
            query: (userID) => `/api/users/${userID}/payment-methods`,
        }),
        addPaymentMethod: builder.mutation({
            query: (paymentMethod) => ({
                url: `/api/users/${paymentMethod.userID}/payment-methods`,
                method: 'POST',
                body: paymentMethod,
            }),
        }),
        updatePaymentMethod: builder.mutation({
            query: (paymentMethodDetail) => ({
                url: `/api/users/${paymentMethodDetail.userID}/payment-methods/${paymentMethodDetail.paymentMethodId}`,
                method: 'PUT',
                body: paymentMethodDetail,
            }),
        }),
        deletePaymentMethod: builder.mutation({
            query: ({ userID, paymentMethodId }) => ({
                url: `/api/users/${userID}/payment-methods/${paymentMethodId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useUpdateUserCompleteMutation,
    useDeleteUserMutation,
    useGetCartQuery,
    useCreateCartItemMutation,
    useUpdateCartItemMutation,
    useDeleteCartItemMutation,
    useGetWishlistQuery,
    useCreateWishlistItemMutation,
    useDeleteWishlistItemMutation,
    useGetPaymentMethodsQuery,
    useAddPaymentMethodMutation,
    useUpdatePaymentMethodMutation,
    useDeletePaymentMethodMutation,
} = extendedUsersApiSlice;
