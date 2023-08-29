import { useGetCategoriesQuery } from '../../../features/category/categorySlice';
import CategoryLink from './CategoryLink';

// const categories = ['Adult', 'Kids', 'Home', 'Cases'];

const CategoryLinkList = ({ currentCategory }) => {
    const { data: categories, isLoading, isSuccess, isError, error } = useGetCategoriesQuery();

    console.log(categories);

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = (
            <>
                {categories.map((category) => (
                    <CategoryLink
                        key={category?.categoryID}
                        category={category}
                        isCurrentCategory={currentCategory === category?.name?.toLowerCase()}
                    />
                ))}
            </>
        );
    } else if (isError) {
        content = <p>{error}</p>;
    }
    return content;
};

export default CategoryLinkList;
