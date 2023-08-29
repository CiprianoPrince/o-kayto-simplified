import CategoryLink from './CategoryLink';

const categories = ['Adult', 'Kids', 'Home', 'Cases'];

const CategoryLinkList = ({ currentCategory }) => {
    return (
        <>
            {categories.map((category) => (
                <CategoryLink
                    key={category}
                    category={category}
                    isCurrentCategory={currentCategory === category.toLowerCase()}
                />
            ))}
        </>
    );
};

export default CategoryLinkList;
