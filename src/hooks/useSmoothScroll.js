import { useEffect } from 'react';

/**
 * Hook for smooth scrolling to elements
 * Replaces jQuery smoothscroll functionality
 */
export default function useSmoothScroll() {
    useEffect(() => {
        const handleSmoothScroll = (e) => {
            const target = e.target.closest('.smoothscroll');
            if (!target) return;

            e.preventDefault();
            const href = target.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            const targetElement = document.querySelector(href);
            if (!targetElement) return;

            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        };

        document.addEventListener('click', handleSmoothScroll);
        return () => {
            document.removeEventListener('click', handleSmoothScroll);
        };
    }, []);
}

