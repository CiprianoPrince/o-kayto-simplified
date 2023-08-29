import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = ({ inputGroupClass, formGroupClass, inputGroupTextClass }) => {
    return (
        <>
            <div className={`input-group | w-full max-w-full ${inputGroupClass}`}>
                <input
                    className={`form-control | peer focus:ring-accent-500 ${formGroupClass}`}
                    type="search"
                    placeholder="What are you looking for?"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                />

                <span
                    className={`input-group-text | [ ] bg-accent-500 hover:bg-accent-400 ${inputGroupTextClass}`}
                    tabIndex="0"
                >
                    <MagnifyingGlassIcon className=" h-6 w-6" role="button" />
                </span>
            </div>
        </>
    );
};

export default SearchBar;
