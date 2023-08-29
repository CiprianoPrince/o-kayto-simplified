import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

const BreadCrumb = ({ children }) => {
    const childrenArray = React.Children.toArray(children);
    const lastChildIndex = childrenArray.length - 1;
    return (
        <nav className="w-full rounded-md">
            <ol className="list-reset flex">
                {childrenArray.map((child, index) => {
                    if (lastChildIndex === index) return child;
                    return (
                        <>
                            {child}
                            <li>
                                <span className="mx-2 text-neutral-500 dark:text-neutral-400">
                                    <ChevronRightIcon className="inline h-4 w-4 stroke-2" />
                                </span>
                            </li>
                        </>
                    );
                })}
            </ol>
        </nav>
    );
};

const BreadCrumbItem = ({ to, children, isDisabled, ...props }) => {
    const location = useLocation();
    const isActive =
        `${location.pathname}${location.search}` === to
            ? 'text-accent-500 [ hover:text-accent-700 '
            : 'text-secondary-400 [ hover:text-accent-400 ]';
    return (
        <li>
            {isDisabled ? (
                <span
                    className={` cursor-default font-semibold text-secondary-400 transition duration-150 ease-in-out`}
                    to={to}
                    {...props}
                >
                    {children}
                </span>
            ) : (
                <Link
                    className={`cursor-pointer font-semibold transition duration-150 ease-in-out ${isActive} [ ] focus:text-accent-600 active:text-accent-700`}
                    to={to}
                    {...props}
                >
                    {children}
                </Link>
            )}
        </li>
    );
};

BreadCrumb.Item = BreadCrumbItem;

export default BreadCrumb;
