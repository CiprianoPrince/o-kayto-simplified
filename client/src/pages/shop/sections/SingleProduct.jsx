import { BreadCrumb } from '../../../components/ui';
import ProductVariant from './ProductVariant';
import { useGetProductByIdQuery } from '../../../features/products/productSlice';

const SingleProduct = ({ categoryParam, productParam }) => {
    const {
        data: product,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetProductByIdQuery(productParam);

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
                                {categoryParam.toUpperCaseFirst()}
                            </BreadCrumb.Item>
                        ) : null}
                        {productParam ? (
                            <BreadCrumb.Item
                                to={`/shop?category=${categoryParam}&product=${productParam}`}
                            >
                                {productParam.toUpperCaseFirst()}
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
