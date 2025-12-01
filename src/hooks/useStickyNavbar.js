import { useEffect, useState } from 'react';

/**
 * Hook for sticky navbar behavior
 * Adds background color when scrolling past a threshold
 */
export default function useStickyNavbar(threshold = 50) {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsSticky(scrollTop > threshold);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [threshold]);

    return isSticky;
}

