const Pagination = () => {
    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="list-style-none flex items-center justify-center gap-4">
                    <li>
                        <a
                            className="relative block rounded border bg-transparent px-4 py-2 text-sm text-secondary-600 transition-all duration-300 hover:bg-neutral-100 "
                            href="#"
                        >
                            Previous
                        </a>
                    </li>

                    <li>
                        <a
                            className="relative block rounded bg-transparent px-4 py-2 text-sm text-secondary-600 transition-all duration-300 hover:bg-neutral-100 "
                            href="#"
                        >
                            1
                        </a>
                    </li>

                    <li aria-current="page">
                        <a
                            className="relative block rounded bg-transparent px-4 py-2 text-sm text-secondary-600 transition-all duration-300 hover:bg-neutral-100 "
                            href="#"
                        >
                            2
                        </a>
                    </li>

                    <li>
                        <a
                            className="relative block rounded bg-transparent px-4 py-2 text-sm text-secondary-600 transition-all duration-300 hover:bg-neutral-100 "
                            href="#"
                        >
                            3
                        </a>
                    </li>
                    <li>
                        <a
                            className="relative block rounded border bg-transparent px-4 py-2 text-sm text-secondary-600 transition-all duration-300 hover:bg-neutral-100 "
                            href="#"
                        >
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Pagination;
