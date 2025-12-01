import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import useAuth from '../hooks/useAuth';
import useSmoothScroll from '../hooks/useSmoothScroll';
import useNavbarCollapse from '../hooks/useNavbarCollapse';
import Timeline from '../components/timeline/Timeline';
import '../styles/Accordion.css';

const Home = () => {
    const { isAuthenticated } = useAuth();
    const [activeTab, setActiveTab] = useState('tickets');
    const [openAccordion, setOpenAccordion] = useState('collapseOne');

    // Initialize scroll effects
    useSmoothScroll();
    useNavbarCollapse();

    // Initialize Bootstrap collapse for accordion animations
    useEffect(() => {
        // Listen for Bootstrap collapse events to sync React state
        const handleShown = (event) => {
            const targetId = event.target.id;
            setOpenAccordion(targetId);
        };

        const handleHidden = () => {
            // When an accordion closes, check if another is open
            const openElement = document.querySelector('.accordion-collapse.show');
            if (openElement) {
                setOpenAccordion(openElement.id);
            } else {
                setOpenAccordion(null);
            }
        };

        const collapseElements = document.querySelectorAll('.accordion-collapse');
        collapseElements.forEach((element) => {
            element.addEventListener('shown.bs.collapse', handleShown);
            element.addEventListener('hidden.bs.collapse', handleHidden);
        });

        return () => {
            collapseElements.forEach((element) => {
                element.removeEventListener('shown.bs.collapse', handleShown);
                element.removeEventListener('hidden.bs.collapse', handleHidden);
            });
        };
    }, []);

    const toggleAccordion = (id) => {
        // Bootstrap handles the toggle via data-bs-toggle attribute
        // State syncs via event listeners above
        // This function is kept for potential future use but Bootstrap does the work
    };

    return (
        <>
            {/* HERO SECTION - Client Dashboard Focus */}
            <section className="hero-section d-flex justify-content-center align-items-center" id="home">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-12 mx-auto text-center">
                            {isAuthenticated ? (
                                <>
                                    <h1 className="text-white">Welcome to Your Client Portal</h1>
                                    <h6 className="text-light">
                                        Submit maintenance requests, track interventions in real-time, and manage your facility needs efficiently.
                                    </h6>
                                    <div className="mt-4">
                                        <Link to="/create-ticket" className="btn custom-btn me-2" style={{ backgroundColor: '#004598', borderColor: '#004598', color: '#fff' }}>
                                            Create New Request
                                        </Link>
                                        <Link to="/tickets" className="btn btn-outline-light">
                                            View My Tickets
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h1 className="text-white">Professional Maintenance Solutions</h1>
                                    <h6 className="text-light">Efficient, reliable, and secure facility management services.</h6>
                                    <div className="mt-4">
                                        <Link to="/login" className="btn btn-primary me-2">Login</Link>
                                        <Link to="/register" className="btn btn-outline-light">Register</Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURED SECTION */}
            <section className="featured-section">
                <div className="container">
                    <div className="row justify-content-center">
                        {/* Tickets Management */}
                        <div className="col-lg-4 col-12 mb-4 mb-lg-0">
                            <div className="custom-block bg-white shadow-lg">
                                <Link to="/tickets">
                                    <div className="d-flex">
                                        <div>
                                            <h5 className="mb-2">Tickets Management</h5>
                                            <p className="mb-0">Assign, validate, and monitor all user maintenance requests.</p>
                                        </div>
                                        <span className="badge bg-danger rounded-pill ms-auto">New</span>
                                    </div>
                                    <img src="/images/topics/undraw_Finance_re_gnv2.png" className="custom-block-image img-fluid" alt="Tickets" />
                                </Link>
                            </div>
                        </div>

                        {/* System Analytics */}
                        <div className="col-lg-6 col-12">
                            <div className="custom-block custom-block-overlay">
                                <div className="d-flex flex-column h-100">
                                    <img src="/images/techTeam.png" className="custom-block-image img-fluid" alt="Analytics" />
                                    <div className="custom-block-overlay-text d-flex">
                                        <div>
                                            <h5 className="text-white mb-2">System Analytics</h5>
                                            <p className="text-white">Real-time insights on technicians, interventions, and workflow efficiency.</p>
                                            <Link to="/dashboard" className="btn custom-btn mt-2 mt-lg-3">View Dashboard</Link>
                                        </div>
                                        <span className="badge bg-primary rounded-pill ms-auto">+12%</span>
                                    </div>
                                    <div className="section-overlay"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* EXPLORE SECTION WITH TABS */}
            <section className="explore-section section-padding" id="explore">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2 className="mb-4">Explore the Platform</h2>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link ${activeTab === 'tickets' ? 'active' : ''}`} onClick={() => setActiveTab('tickets')}>Tickets</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link ${activeTab === 'interventions' ? 'active' : ''}`} onClick={() => setActiveTab('interventions')}>Interventions</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link ${activeTab === 'planning' ? 'active' : ''}`} onClick={() => setActiveTab('planning')}>Planning</button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="tab-content">
                                {/* Tickets Tab */}
                                {activeTab === 'tickets' && (
                                    <div className="tab-pane fade show active">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-6 col-12 mb-4">
                                                <div className="custom-block bg-white shadow-lg">
                                                    <Link to="/tickets">
                                                        <div className="d-flex">
                                                            <div>
                                                                <h5 className="mb-2">Create Ticket</h5>
                                                                <p className="mb-0">Submit a new request for technical intervention.</p>
                                                            </div>
                                                        </div>
                                                        <img src="/images/topics/undraw_Remote_design_team_re_urdx.png" className="custom-block-image img-fluid" alt="" />
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="col-lg-4 col-md-6 col-12 mb-4">
                                                <div className="custom-block bg-white shadow-lg">
                                                    <Link to="/tickets">
                                                        <div className="d-flex">
                                                            <div>
                                                                <h5 className="mb-2">Track Tickets</h5>
                                                                <p className="mb-0">Follow the progress of your existing requests.</p>
                                                            </div>
                                                        </div>
                                                        <img src="/images/topics/undraw_Redesign_feedback_re_jvm0.png" className="custom-block-image img-fluid" alt="" />
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="col-lg-4 col-md-6 col-12 mb-4">
                                                <div className="custom-block bg-white shadow-lg">
                                                    <Link to="/tickets">
                                                        <div className="d-flex">
                                                            <div>
                                                                <h5 className="mb-2">Ticket History</h5>
                                                                <p className="mb-0">Access the complete history of interventions.</p>
                                                            </div>
                                                        </div>
                                                        <img src="/images/topics/colleagues-working-cozy-office-medium-shot.png" className="custom-block-image img-fluid" alt="" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Interventions Tab */}
                                {activeTab === 'interventions' && (
                                    <div className="tab-pane fade show active">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-6 col-12 mb-4">
                                                <div className="custom-block bg-white shadow-lg">
                                                    <Link to="/interventions">
                                                        <div className="d-flex">
                                                            <div>
                                                                <h5 className="mb-2">Ongoing Interventions</h5>
                                                                <p className="mb-0">See which interventions are currently in progress.</p>
                                                            </div>
                                                        </div>
                                                        <img src="/images/topics/undraw_online_ad_re_ol62.png" className="custom-block-image img-fluid" alt="" />
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="col-lg-4 col-md-6 col-12 mb-4">
                                                <div className="custom-block bg-white shadow-lg">
                                                    <Link to="/interventions">
                                                        <div className="d-flex">
                                                            <div>
                                                                <h5 className="mb-2">Assigned Interventions</h5>
                                                                <p className="mb-0">Check interventions assigned to specific technicians.</p>
                                                            </div>
                                                        </div>
                                                        <img src="/images/topics/undraw_Group_video_re_btu7.png" className="custom-block-image img-fluid" alt="" />
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="col-lg-4 col-md-6 col-12 mb-4">
                                                <div className="custom-block bg-white shadow-lg">
                                                    <Link to="/interventions">
                                                        <div className="d-flex">
                                                            <div>
                                                                <h5 className="mb-2">Completed Interventions</h5>
                                                                <p className="mb-0">Review all completed technical interventions.</p>
                                                            </div>
                                                        </div>
                                                        <img src="/images/topics/undraw_viral_tweet_gndb.png" className="custom-block-image img-fluid" alt="" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Planning Tab */}
                                {activeTab === 'planning' && (
                                    <div className="tab-pane fade show active">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-6 col-12 mb-4">
                                                <div className="custom-block bg-white shadow-lg">
                                                    <Link to="/planning">
                                                        <div className="d-flex">
                                                            <div>
                                                                <h5 className="mb-2">Schedule Management</h5>
                                                                <p className="mb-0">View and manage intervention schedules.</p>
                                                            </div>
                                                        </div>
                                                        <img src="/images/topics/undraw_Educator_re_ju47.png" className="custom-block-image img-fluid" alt="" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TIMELINE SECTION */}
            <Timeline />

            {/* FAQ SECTION */}
            <section className="faq-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <h2 className="mb-4">Frequently Asked Questions</h2>
                        </div>

                        <div className="clearfix"></div>

                        <div className="col-lg-5 col-12">
                            <img src="/images/faq_graphic.jpg" className="img-fluid" alt="FAQs" />
                        </div>

                        <div className="col-lg-6 col-12 m-auto">
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button
                                            className={`accordion-button ${openAccordion === 'collapseOne' ? '' : 'collapsed'}`}
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne"
                                            aria-expanded={openAccordion === 'collapseOne'}
                                            aria-controls="collapseOne"
                                            onClick={() => toggleAccordion('collapseOne')}
                                        >
                                            <span>How do I create a ticket?</span>
                                            {openAccordion === 'collapseOne' ? (
                                                <ExpandLess sx={{ ml: 'auto', fontSize: '1.5rem' }} />
                                            ) : (
                                                <ExpandMore sx={{ ml: 'auto', fontSize: '1.5rem' }} />
                                            )}
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseOne"
                                        className={`accordion-collapse collapse ${openAccordion === 'collapseOne' ? 'show' : ''}`}
                                        aria-labelledby="headingOne"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            You can create a new intervention request directly from the "Tickets" section by filling in the details of the issue or service needed.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button
                                            className={`accordion-button ${openAccordion === 'collapseTwo' ? '' : 'collapsed'}`}
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwo"
                                            aria-expanded={openAccordion === 'collapseTwo'}
                                            aria-controls="collapseTwo"
                                            onClick={() => toggleAccordion('collapseTwo')}
                                        >
                                            <span>How do I track my request?</span>
                                            {openAccordion === 'collapseTwo' ? (
                                                <ExpandLess sx={{ ml: 'auto', fontSize: '1.5rem' }} />
                                            ) : (
                                                <ExpandMore sx={{ ml: 'auto', fontSize: '1.5rem' }} />
                                            )}
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseTwo"
                                        className={`accordion-collapse collapse ${openAccordion === 'collapseTwo' ? 'show' : ''}`}
                                        aria-labelledby="headingTwo"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            Each ticket has a real-time status update. You can track progress, assigned technician, and estimated resolution time directly on the platform.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button
                                            className={`accordion-button ${openAccordion === 'collapseThree' ? '' : 'collapsed'}`}
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseThree"
                                            aria-expanded={openAccordion === 'collapseThree'}
                                            aria-controls="collapseThree"
                                            onClick={() => toggleAccordion('collapseThree')}
                                        >
                                            <span>Do I need an account to use it?</span>
                                            {openAccordion === 'collapseThree' ? (
                                                <ExpandLess sx={{ ml: 'auto', fontSize: '1.5rem' }} />
                                            ) : (
                                                <ExpandMore sx={{ ml: 'auto', fontSize: '1.5rem' }} />
                                            )}
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseThree"
                                        className={`accordion-collapse collapse ${openAccordion === 'collapseThree' ? 'show' : ''}`}
                                        aria-labelledby="headingThree"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            Yes, you need to sign up as a client, technician, or admin to access the platform features. Each role has different permissions.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
