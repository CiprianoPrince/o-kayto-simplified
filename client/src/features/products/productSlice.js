import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

// Products Entity Adapter
const productsAdapter = createEntityAdapter({
    selectId: (product) => product.productID,
    sortComparer: (a, b) => a.productID - b.productID,
});

const initialProductsState = productsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Product Endpoints
        getProducts: builder.query({
            query: () => '/api/products',
            transformResponse: (response) => response.data,
            providesTags: (result) => [
                { type: 'Product', id: 'LIST' },
                ...result.map((product) => ({ type: 'Product', id: product.productID })),
            ],
        }),
        getProductById: builder.query({
            query: (productID) => `/api/products/${productID}`,
            transformResponse: (response) => response.data,
            providesTags: (result) => [{ type: 'Product', id: result.productID }],
        }),
        addNewProduct: builder.mutation({
            query: (newProduct) => ({
                url: '/api/products',
                method: 'POST',
                body: newProduct,
            }),
            invalidatesTags: [{ type: 'Product', id: 'LIST' }],
        }),
        updateProduct: builder.mutation({
            query: (product) => ({
                url: `/api/products/${product.productID}`,
                method: 'PUT',
                body: product,
            }),
            invalidatesTags: ({ productID }) => [{ type: 'Product', id: productID }],
        }),
        deleteProduct: builder.mutation({
            query: (productID) => ({
                url: `/api/products/${productID}`,
                method: 'DELETE',
                body: { productID },
            }),
            invalidatesTags: (productID) => [{ type: 'Product', id: productID }],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useAddNewProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = extendedApiSlice;
