import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import colorNames from 'colornames';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../../features/auth/authSlice';
import jwtDecode from 'jwt-decode';
import { useCreateCartItemMutation } from '../../../features/user/userSlice';
const ENDPOINT = 'http://localhost:8000';
const STORAGEPATH = 'storage/uploads/images';

const ProductVariant = ({ product }) => {
    const { register, handleSubmit, formState, watch, setValue } = useForm({
        defaultValues: {
            quantity: 1,
        },
    });

    const [createCartItem, isLoading] = useCreateCartItemMutation();

    const token = useSelector(selectAccessToken);

    const { errors } = formState;

    const quantity = watch('quantity', 1);

    const onSubmit = async (cartItem) => {
        if (errors.length) return;
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            const userID = decoded?.userInfo?.userID;
            if (!userID) return;
            await createCartItem({ userID, cartItem }).unwrap();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDecrement = () => {
        setValue('quantity', Math.max(Number(quantity) - 1, 1));
    };

    const handleIncrement = () => {
        setValue('quantity', Number(quantity) + 1);
    };
    return (
        <>
            <div className="border md:basis-6/12">
                <img
                    src={`${ENDPOINT}/${STORAGEPATH}/products/${product.imagePath}`}
                    alt={product.altText}
                />
            </div>

            <form
                className=" basis-12/12 space-y-4 divide-y md:basis-6/12 md:self-start"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col gap-2">
                    <h1 className="header-3 line-clamp-1 font-palanquin font-bold">
                        {product.name}
                    </h1>
                    <span className="font-montserrat text-xl font-bold text-secondary-600">
                        &#8369;{product.price}
                    </span>
                </div>

                <div className="flex flex-row gap-2 py-4">
                    <div className="flex-1 space-y-2">
                        <p className="font-medium">Size</p>
                        <div className="relative inline-block space-x-2">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full border text-center align-middle">
                                <div className="font-palanquin text-4xl font-bold text-accent-500">
                                    {product.size}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-2">
                        <p className="font-medium">Color</p>
                        <div className="space-x-2">
                            <div
                                className="inline-block h-20 w-20 rounded-full border"
                                style={{ backgroundColor: `${colorNames(product.color)}` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-start py-4">
                    <div className="input-group |group flex max-w-[10rem] justify-center">
                        <span
                            className="input-group-text | group bg-transparent hover:bg-accent-500"
                            tabIndex="0"
                            onClick={handleDecrement}
                        >
                            <MinusIcon
                                className="h-6 w-6 text-accent-500 group-hover:text-primary-50"
                                role="button"
                            />
                        </span>

                        <input
                            className="form-control | peer w-full max-w-[3.5rem] text-center focus:ring-accent-500"
                            type="number"
                            {...register('quantity')}
                        />

                        <span
                            className="input-group-text | group bg-transparent hover:bg-accent-500"
                            tabIndex="0"
                            onClick={handleIncrement}
                        >
                            <PlusIcon
                                className="h-6 w-6 text-accent-500 group-hover:text-primary-50"
                                role="button"
                            />
                        </span>
                    </div>

                    <input type="hidden" {...register('productID')} value={product.productID} />

                    <button className="button" type="submit">
                        Add to cart
                    </button>
                </div>
            </form>
        </>
    );
};

export default ProductVariant;
