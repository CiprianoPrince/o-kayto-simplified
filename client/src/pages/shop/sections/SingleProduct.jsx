import { BreadCrumb } from '../../../components/ui';
import ProductVariant from './ProductVariant';
import { useGetProductByIdQuery } from '../../../features/products/productSlice';
import { useGetCategoryByIdQuery } from '../../../features/category/categorySlice';

const SingleProduct = ({ categoryParam, productParam }) => {
    const {
        data: product,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetProductByIdQuery(productParam);

    const {
        data: category,
        isLoading: isLoadingCategory,
        isSuccessCategory,
        isErrorCategory,
        errorCategory,
    } = useGetCategoryByIdQuery(categoryParam);

    let categoryName;
    if (isLoadingCategory) {
        categoryName = 'Loading...';
    } else if (isSuccessCategory) {
        categoryName = category?.name;
    } else if (isErrorCategory) {
        categoryName = errorCategory;
    }

    let content;
    if (isLoading) {
        content = <h1>Loading...</h1>;
    } else if (isSuccess) {
        content = <ProductVariant product={product} />;
    } else if (isError) {
        content = <h1>{error}...</h1>;
    }

    return (
        <main>
            <section className="container mx-auto space-y-8 px-4 py-8">
                <div>
                    <BreadCrumb>
                        <BreadCrumb.Item to="/">Home</BreadCrumb.Item>
                        <BreadCrumb.Item to="/shop">Shop</BreadCrumb.Item>
                        {categoryParam ? (
                            <BreadCrumb.Item to={`/shop?category=${categoryParam}`}>
                                {category?.name?.toUpperCaseFirst()}
                            </BreadCrumb.Item>
                        ) : null}
                        {productParam ? (
                            <BreadCrumb.Item
                                to={`/shop?category=${categoryParam}&product=${productParam}`}
                                className="line-clamp-1"
                            >
                                {product?.name?.toUpperCaseFirst()}
                            </BreadCrumb.Item>
                        ) : null}
                    </BreadCrumb>
                </div>

                <div className="flex flex-col justify-center gap-4 md:flex-row">{content}</div>
            </section>
        </main>
    );
};

export default SingleProduct;
