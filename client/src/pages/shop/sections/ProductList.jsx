import { useGetProductsQuery } from '../../../features/products/productSlice';
import ProductCard from './ProductCard';

const ProductList = () => {
    const {
        data: products,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetProductsQuery('getProducts');
    //
    let content;
    if (isLoading) {
        content = <h1>Loading...</h1>;
    } else if (isSuccess) {
        content = products.map((product) => (
            <ProductCard key={product.productID} product={product} />
        ));
    } else if (isError) {
        content = <h1>{error}...</h1>;
    }

    return content;
};

export default ProductList;
