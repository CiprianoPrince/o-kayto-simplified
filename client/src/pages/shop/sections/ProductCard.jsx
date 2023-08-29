import { Link } from 'react-router-dom';
import FadeIn from '../../../components/others/FadeIn';
import decodeHTMLEntities from '../../../utils/string/decodeHTMLEntities';

const ENDPOINT = 'http://localhost:8000';
const STORAGEPATH = 'storage/uploads/images';

const ProductCard = ({ product }) => {
    return (
        <FadeIn className="flex flex-col space-y-2">
            <Link to={`/shop?category=${product.categoryID}&product=${product.productID}`}>
                <img
                    className="rounded-md"
                    src={`${ENDPOINT}/${STORAGEPATH}/products/${product.imagePath}`}
                    alt={product.altText}
                />
            </Link>
            <div className="flex flex-row items-center justify-between">
                <span className="line-clamp-1 font-palanquin text-xl font-medium tracking-wide text-secondary-500">
                    {decodeHTMLEntities(product.name)}
                </span>
                <span className="text-2xl font-medium text-secondary-600">
                    &#8369;{product.price}
                </span>
            </div>
            <div className="flex flex-row items-center justify-between">
                <span className="font-montserrat text-base font-medium text-secondary-400">
                    3 Colors
                </span>
                <span className="truncate font-montserrat text-base font-medium text-secondary-400">
                    &#8369;{product.price}
                </span>
            </div>
        </FadeIn>
    );
};

export default ProductCard;
