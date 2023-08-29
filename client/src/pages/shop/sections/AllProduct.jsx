import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import BreadCrumb from '../../../components/ui/BreadCrumb';
import CategoryLinkList from './CategoryLinkList';
import ProductList from './ProductList';
import Pagination from './Pagination';

const AllProduct = ({ categoryParam }) => {

    return (
        <main>
            <section className="container mx-auto space-y-4 px-4 py-8">
                <div>
                    <BreadCrumb>
                        <BreadCrumb.Item to="/">Home</BreadCrumb.Item>
                        <BreadCrumb.Item to="/shop">Shop</BreadCrumb.Item>
                        {categoryParam ? (
                            <BreadCrumb.Item to={`/shop?category=${categoryParam}`}>
                                {categoryParam.toUpperCaseFirst()}
                            </BreadCrumb.Item>
                        ) : null}
                    </BreadCrumb>
                </div>

                <div className="flex flex-row gap-4 lg:flex-row lg:gap-6">
                    <div className="hidden basis-3/12 space-y-4 self-start rounded-lg border p-4 shadow-lg lg:block">
                        <Link
                            className="flex w-full flex-row items-center justify-between rounded-md bg-primary-100 px-4 py-3 text-start text-lg font-medium capitalize text-secondary-500 hover:bg-primary-200 hover:text-secondary-600 focus:bg-primary-300 focus:text-secondary-700 active:bg-primary-300 active:text-secondary-700 "
                            type="button"
                            to="/shop"
                        >
                            Category <ChevronDownIcon className="ms-auto inline-block h-6 w-6" />
                        </Link>

                        <div className="flex flex-col gap-4 px-4">
                            <CategoryLinkList currentCategory={categoryParam} />
                        </div>
                    </div>

                    <div className="space-y-8 lg:basis-9/12">
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-6 ">
                            <ProductList />
                        </div>

                        <div>
                            <Pagination />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AllProduct;
