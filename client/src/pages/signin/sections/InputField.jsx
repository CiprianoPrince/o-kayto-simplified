const INPUT_CLASSES = 'form-control | px-3 py-2';

const InputField = ({ label, type, register, error, placeholder }) => (
    <div>
        <label className="form-label | block" htmlFor={type}>
            {label}
            <span className="text-xs text-rose-600">{error?.message}</span>
        </label>
        <input
            className={INPUT_CLASSES}
            {...register(type)}
            type={type}
            id={type}
            placeholder={placeholder}
        />
    </div>
);

export default InputField;
