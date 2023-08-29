const DropDownContainer = ({ children }) => {
    return (
        <nav
            className="rounded-lg bg-primary-50 p-4 shadow-xl ring-1 ring-secondary-900/5"
            aria-label="main"
        >
            <ul className="flex flex-col space-x-4">
                <li className="text-lg font-semibold ">
                    {Array.isArray(children) ? children.map((child) => child) : children}
                </li>
            </ul>
        </nav>
    );
};

export default DropDownContainer;
