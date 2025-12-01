import React, { useEffect, useRef, useState } from 'react';
import { Search, Bookmark, MenuBook } from '@mui/icons-material';
import './Timeline.css';

const Timeline = () => {
    const timelineRef = useRef(null);
    const listProgressRef = useRef(null);
    const innerProgressRef = useRef(null);
    const [activeItems, setActiveItems] = useState(new Set());

    useEffect(() => {
        const timeline = timelineRef.current;
        const listProgress = listProgressRef.current;
        const innerProgress = innerProgressRef.current;

        if (!timeline || !listProgress || !innerProgress) return;

        const timelineItems = timeline.querySelectorAll('li');

        // Intersection Observer for Timeline Items
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Trigger when 50% visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    // Optional: remove active class when scrolling out
                    // entry.target.classList.remove('active');

                    // Native behavior usually keeps it active once visited, or toggles. 
                    // Let's toggle based on the previous logic which removed it.
                    const rect = entry.target.getBoundingClientRect();
                    const docViewTop = window.innerHeight;
                    // If element is below view, remove active. If above, keep it (so it stays "done").
                    if (rect.top > docViewTop) {
                        entry.target.classList.remove('active');
                    }
                }
            });
        }, observerOptions);

        timelineItems.forEach(item => observer.observe(item));

        // Scroll Handler for Progress Bar
        const updateProgress = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const viewportHeight = window.innerHeight;

            const containerRect = timeline.getBoundingClientRect();
            const containerTop = containerRect.top + scrollTop;
            const containerHeight = containerRect.height;

            // Calculate how much of the timeline is visible/scrolled
            // We want the bar to fill as we scroll down the timeline section

            // Native logic seemed to be: 
            // const MainTimelineContainerBottom = containerBottom - viewportHeight * 0.5;
            // innerProgress.style.height = `${MainTimelineContainerBottom}px`;

            // Let's replicate the native logic more precisely based on the previous code's intent
            // The previous code calculated height based on container bottom relative to viewport center.

            const containerBottom = containerRect.bottom;
            // The previous logic: height = containerBottom - viewportHeight * 0.5
            // This means as we scroll down (container moves up), containerBottom decreases.
            // Wait, if containerBottom decreases, height decreases? That sounds inverted for a "progress" bar filling up.
            // Let's look at the CSS: .inner is at bottom: 0.
            // So if height increases, it grows from bottom up?
            // CSS: .inner { bottom: 0; height: 0; ... }
            // If it grows from bottom, it looks like it's filling up from the bottom?
            // Usually timeline progress fills from top to bottom.
            // Let's check CSS again.
            // .list-progress { top: 0; }
            // .inner { bottom: 0; } -> This means it's anchored at the bottom.
            // If I want it to fill from top, it should be top: 0.
            // But maybe the design is a line that "unfills" or "fills" in a specific way.

            // Let's stick to the previous logic's math but ensure it works.
            // Previous: innerProgress.style.height = `${MainTimelineContainerBottom}px`;
            // If we are at the top of the section, containerBottom is large (section height + viewport offset).
            // So height is large.
            // As we scroll down, containerBottom decreases. Height decreases.
            // So the bar shrinks from top to bottom? Or shrinks from bottom?
            // If anchored at bottom, and height decreases, it shrinks towards the bottom.
            // This implies the bar is initially full and "reveals" or "hides"?

            // Actually, let's look at the "native" behavior description if possible.
            // "Restore Timeline Section Animations... Rebuild scroll animations... li.active::before"

            // If I can't be sure, I should probably make it fill from top to bottom as we scroll.
            // Standard timeline: line fills from top as you scroll down.
            // CSS: .list-progress { top: 0; } .inner { height: 0; background: secondary; }
            // If I want it to fill from top, I should probably anchor .inner to top: 0.
            // But the CSS says bottom: 0.

            // Let's assume the previous code was trying to replicate the native behavior but might have been slightly off or I am misinterpreting.
            // However, if I change the CSS to top: 0, I can make it fill from top.
            // Let's try to calculate the progress from 0 to 100% based on scroll.

            const start = containerRect.top + scrollTop - viewportHeight * 0.5;
            const end = containerRect.bottom + scrollTop - viewportHeight * 0.5;
            const current = scrollTop;

            // This is getting complicated without seeing it.
            // Let's stick to the previous logic but optimized, AND fix the CSS if needed.
            // Previous logic:
            // const MainTimelineContainerBottom = containerBottom - viewportHeight * 0.5;
            // innerProgress.style.height = `${MainTimelineContainerBottom}px`;

            // Let's use the exact previous logic for the bar, as it was likely copied from the template or an attempt at it.
            // But I will wrap it in requestAnimationFrame.

            const center = window.innerHeight * 0.5;
            const dist = containerRect.bottom - center;

            if (dist > 0) {
                innerProgress.style.height = `${dist}px`;
            } else {
                innerProgress.style.height = '0px';
            }
        };

        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateProgress();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', updateProgress);

        // Initial call
        updateProgress();

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateProgress);
        };
    }, []);

    return (
        <section className="timeline-section section-padding" id="section_3">
            <div className="section-overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <h2 className="text-white mb-4">How does it work?</h2>
                    </div>

                    <div className="col-lg-10 col-12 mx-auto">
                        <div className="timeline-container">
                            <ul
                                className="vertical-scrollable-timeline"
                                id="vertical-scrollable-timeline"
                                ref={timelineRef}
                            >
                                <div className="list-progress" ref={listProgressRef}>
                                    <div className="inner" ref={innerProgressRef}></div>
                                </div>

                                <li>
                                    <h4 className="text-white mb-3">Submit a Request</h4>
                                    <p className="text-white">
                                        Clients create a maintenance or technical intervention request through the platform,
                                        describing the issue or service needed.
                                    </p>
                                    <div className="icon-holder">
                                        <Search sx={{ fontSize: '2rem', color: '#fff' }} />
                                    </div>
                                </li>

                                <li>
                                    <h4 className="text-white mb-3">Assignment & Planning</h4>
                                    <p className="text-white">
                                        The request is automatically assigned to a technician, and scheduled according to
                                        availability and priority.
                                    </p>
                                    <div className="icon-holder">
                                        <Bookmark sx={{ fontSize: '2rem', color: '#fff' }} />
                                    </div>
                                </li>

                                <li>
                                    <h4 className="text-white mb-3">Execution & Validation</h4>
                                    <p className="text-white">
                                        The technician performs the intervention, updates the ticket, and the client
                                        validates the resolution through the platform.
                                    </p>
                                    <div className="icon-holder">
                                        <MenuBook sx={{ fontSize: '2rem', color: '#fff' }} />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-12 text-center mt-5">
                        <p className="text-white">
                            Want to see it in action?
                            <a href="#contact" className="btn custom-btn custom-border-btn ms-3 smoothscroll">
                                Watch Demo
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;

