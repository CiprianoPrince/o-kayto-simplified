import { NavLink } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const CategoryLink = ({ category, isCurrentCategory }) => {
    let style =
        'flex w-full flex-row items-center justify-between rounded-md bg-primary-50 px-4 py-3 text-start text-lg font-medium capitalize text-secondary-500 hover:bg-primary-100/75 hover:text-secondary-600 focus:bg-primary-200/75 focus:text-secondary-700 active:bg-primary-200/75 active:text-secondary-700';
    if (isCurrentCategory) {
        style =
            'flex w-full flex-row items-center justify-between rounded-md bg-primary-100/75 px-4 py-3 text-start text-lg font-medium capitalize text-secondary-500 hover:bg-primary-100/75 hover:text-secondary-600 focus:bg-primary-200/75 focus:text-secondary-700 active:bg-primary-200/75 active:text-secondary-700';
    }

    return (
        <>
            <NavLink
                className={style}
                type="button"
                to={`/shop?category=${category.toLowerCase()}`}
            >
                {category} <ChevronDownIcon className="ms-auto inline-block h-6 w-6" />
            </NavLink>
        </>
    );
};

export default CategoryLink;
