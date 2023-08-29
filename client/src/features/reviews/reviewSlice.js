import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

// Reviews Entity Adapter
const reviewsAdapter = createEntityAdapter({
    selectId: (review) => review.reviewID,
    sortComparer: (a, b) => a.reviewID - b.reviewID,
});

const initialReviewsState = reviewsAdapter.getInitialState();

export const extendedReviewsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Review Endpoints
        getReviews: builder.query({
            query: () => '/api/reviews',
            transformResponse: (response) => response.data,
            providesTags: (result) => [
                { type: 'Review', id: 'LIST' },
                ...result.map((review) => ({ type: 'Review', id: review.reviewID })),
            ],
        }),
        getReviewById: builder.query({
            query: (reviewID) => `/api/reviews/${reviewID}`,
            transformResponse: (response) => response.data,
            providesTags: (result) => [{ type: 'Review', id: result.reviewID }],
        }),
        addNewReview: builder.mutation({
            query: (newReview) => ({
                url: '/api/reviews',
                method: 'POST',
                body: newReview,
            }),
            invalidatesTags: [{ type: 'Review', id: 'LIST' }],
        }),
        updateReview: builder.mutation({
            query: (review) => ({
                url: `/api/reviews/${review.reviewID}`,
                method: 'PUT',
                body: review,
            }),
            invalidatesTags: ({ reviewID }) => [{ type: 'Review', id: reviewID }],
        }),
        deleteReview: builder.mutation({
            query: (reviewID) => ({
                url: `/api/reviews/${reviewID}`,
                method: 'DELETE',
                body: { reviewID },
            }),
            invalidatesTags: (reviewID) => [{ type: 'Review', id: reviewID }],
        }),
    }),
});

export const {
    useGetReviewsQuery,
    useGetReviewByIdQuery,
    useAddNewReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
} = extendedReviewsApiSlice;
