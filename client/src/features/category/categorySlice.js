import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

// Categories Entity Adapter
const categoriesAdapter = createEntityAdapter({
    selectId: (category) => category.categoryID,
    sortComparer: (a, b) => a.categoryID - b.categoryID,
});

const initialCategoriesState = categoriesAdapter.getInitialState();

export const extendedCategoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => '/api/categories',
            transformResponse: (response) => response.data,
            providesTags: (result) => [
                { type: 'Category', id: 'LIST' },
                ...result.map((category) => ({ type: 'Category', id: category.categoryID })),
            ],
        }),
        getCategoryById: builder.query({
            query: (categoryID) => `/api/categories/${categoryID}`,
            transformResponse: (response) => response.data,
            providesTags: (result) => [{ type: 'Category', id: result.categoryID }],
        }),
        addNewCategory: builder.mutation({
            query: (newCategory) => ({
                url: '/api/categories',
                method: 'POST',
                body: newCategory,
            }),
            invalidatesTags: [{ type: 'Category', id: 'LIST' }],
        }),
        updateCategory: builder.mutation({
            query: (category) => ({
                url: `/api/categories/${category.categoryID}`,
                method: 'PUT',
                body: category,
            }),
            invalidatesTags: ({ categoryID }) => [{ type: 'Category', id: categoryID }],
        }),
        deleteCategory: builder.mutation({
            query: (categoryID) => ({
                url: `/api/categories/${categoryID}`,
                method: 'DELETE',
                body: { categoryID },
            }),
            invalidatesTags: (categoryID) => [{ type: 'Category', id: categoryID }],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useAddNewCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = extendedCategoriesApiSlice;
