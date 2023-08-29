import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

// Variants Entity Adapter
const variantsAdapter = createEntityAdapter({
    selectId: (variant) => variant.variantID,
});

const initialVariantsState = variantsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Variant Endpoints
        getVariantsByProductId: builder.query({
            query: (productID) => `api/products/${productID}/variants`,
            transformResponse: (response) => response.data,
            providesTags: (result) => [
                ...result.map((variant) => ({ type: 'Variant', id: variant.variantID })),
            ],
        }),
        addVariantToProduct: builder.mutation({
            query: ({ productID, variant }) => ({
                url: `/products/${productID}/variants`,
                method: 'POST',
                body: variant,
            }),
            invalidatesTags: ({ variantID }) => [{ type: 'Variant', id: variantID }],
        }),
    }),
});

export const { useGetVariantsByProductIdQuery, useAddVariantToProductMutation } = extendedApiSlice;
