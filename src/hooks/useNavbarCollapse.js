import { useEffect } from 'react';

/**
 * Hook to handle navbar collapse on mobile
 * Replaces jQuery navbar collapse functionality
 */
export default function useNavbarCollapse() {
    useEffect(() => {
        const handleNavClick = (e) => {
            const navLink = e.target.closest('.navbar-collapse a');
            if (!navLink) return;

            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                // Use Bootstrap's collapse API if available
                const bsCollapse = window.bootstrap?.Collapse?.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                } else {
                    // Fallback: manually remove show class
                    navbarCollapse.classList.remove('show');
                }
            }
        };

        document.addEventListener('click', handleNavClick);
        return () => {
            document.removeEventListener('click', handleNavClick);
        };
    }, []);
}

