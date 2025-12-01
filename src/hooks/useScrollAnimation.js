import { useEffect, useState } from 'react';

/**
 * Hook for scroll-based animations
 * Replaces jQuery scroll animation functionality
 */
export default function useScrollAnimation(selector = '#vertical-scrollable-timeline li') {
    const [activeItems, setActiveItems] = useState(new Set());

    useEffect(() => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) return;

        const isScrollIntoView = (elem) => {
            const rect = elem.getBoundingClientRect();
            const docViewTop = window.pageYOffset;
            const docViewBottom = docViewTop + window.innerHeight;
            const elemTop = rect.top + window.pageYOffset;
            const elemBottom = elemTop + window.innerHeight * 0.5;

            return elemBottom <= docViewBottom && elemTop >= docViewTop;
        };

        const handleScroll = () => {
            const newActiveItems = new Set();
            
            elements.forEach((elem, index) => {
                if (isScrollIntoView(elem)) {
                    elem.classList.add('active');
                    newActiveItems.add(index);
                } else {
                    elem.classList.remove('active');
                }
            });

            // Update timeline container height if it exists
            const timelineContainer = document.getElementById('vertical-scrollable-timeline');
            if (timelineContainer) {
                const containerBottom = timelineContainer.getBoundingClientRect().bottom - window.innerHeight * 0.5;
                const inner = timelineContainer.querySelector('.inner');
                if (inner) {
                    inner.style.height = `${containerBottom}px`;
                }
            }

            setActiveItems(newActiveItems);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [selector]);

    return activeItems;
}

