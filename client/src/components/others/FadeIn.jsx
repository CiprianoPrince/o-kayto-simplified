import { useEffect, useRef, useState } from 'react';

const FadeIn = ({ children, className, as = 'div', ...props }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    const Element = as;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // If the element is in the viewport, set isVisible to true
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    // If the element is not in the viewport, set isVisible to false
                    setIsVisible(false);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <Element
            ref={ref}
            className={`transition-opacity ${
                isVisible ? 'animate-fadeIn' : 'opacity-0'
            } ${className}`}
            {...props}
        >
            {children}
        </Element>
    );
};

export default FadeIn;
