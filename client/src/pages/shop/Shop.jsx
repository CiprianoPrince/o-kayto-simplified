import { useSearchParams } from 'react-router-dom';
import AllProduct from './sections/AllProduct';
import SingleProduct from './sections/SingleProduct';

const Collection = () => {
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');
    const productParam = searchParams.get('product');

    if (productParam) {
        return <SingleProduct categoryParam={categoryParam} productParam={productParam} />;
    }

    return <AllProduct categoryParam={categoryParam} />;
};

export default Collection;
