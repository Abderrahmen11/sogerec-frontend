import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useAuth from '../../hooks/useAuth';
import useTickets from '../../hooks/useTickets';
import useInterventions from '../../hooks/useInterventions';
import useSmoothScroll from '../../hooks/useSmoothScroll';
import useNavbarCollapse from '../../hooks/useNavbarCollapse';
import Timeline from '../timeline/Timeline';
import AnimatedNumber from '../common/AnimatedNumber';
import './DashboardStyles.css';
import '../../styles/Accordion.css';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const DashboardClient = () => {
    const { user } = useAuth();
    const { tickets, loading: ticketsLoading, fetchTickets } = useTickets();
    const { interventions, loading: interventionsLoading, fetchInterventions } = useInterventions();
    const [activeTab, setActiveTab] = useState('tickets');
    const [openAccordion, setOpenAccordion] = useState('collapseOne');

    // Initialize scroll effects
    useSmoothScroll();
    useNavbarCollapse();

    useEffect(() => {
        fetchTickets();
        fetchInterventions();
    }, [fetchTickets, fetchInterventions]);

    // Initialize Bootstrap collapse for accordion animations
    useEffect(() => {
        const handleShown = (event) => {
            const targetId = event.target.id;
            setOpenAccordion(targetId);
        };

        const handleHidden = () => {
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
    };

    // Calculate stats
    const myTickets = tickets || [];
    const openTicketsCount = myTickets.filter(t => t.status === 'open').length;
    const interventionsCount = interventions ? interventions.length : 0;
    const planningCount = interventions ? interventions.filter(i => new Date(i.start_date) > new Date()).length : 0;
    const supportCount = myTickets.length;

    // Chart Data
    const dashboardChartData = {
        labels: ['Requests', 'Interventions', 'Planning', 'Support'],
        datasets: [
            {
                label: 'Count',
                data: [supportCount, interventionsCount, planningCount, supportCount],
                backgroundColor: [
                    'rgba(13,110,253,0.7)',
                    'rgba(25,135,84,0.7)',
                    'rgba(255,193,7,0.7)',
                    'rgba(13,202,240,0.7)'
                ],
                borderRadius: 8,
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: { beginAtZero: true }
        }
    };

    return (
        <>

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
                                            <h5 className="mb-2">My Requests</h5>
                                            <p className="mb-0">View and manage all your maintenance requests.</p>
                                        </div>
                                        <span className="badge bg-primary rounded-pill ms-auto">
                                            <AnimatedNumber value={openTicketsCount} />
                                        </span>
                                    </div>
                                    <img src="/images/topics/undraw_Finance_re_gnv2.png" className="custom-block-image img-fluid" alt="Tickets" />
                                </Link>
                            </div>
                        </div>

                        {/* Interventions Overview */}
                        <div className="col-lg-6 col-12">
                            <div className="custom-block custom-block-overlay">
                                <div className="d-flex flex-column h-100">
                                    <img src="/images/techTeam.png" className="custom-block-image img-fluid" alt="Interventions" />
                                    <div className="custom-block-overlay-text d-flex">
                                        <div>
                                            <h5 className="text-white mb-2">My Interventions</h5>
                                            <p className="text-white">Track the progress of your scheduled interventions.</p>
                                            <Link to="/interventions" className="btn custom-btn mt-2 mt-lg-3">View Interventions</Link>
                                        </div>
                                        <span className="badge bg-success rounded-pill ms-auto">
                                            <AnimatedNumber value={interventionsCount} />
                                        </span>
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
                            <h2 className="mb-4">Explore Your Services</h2>
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
                                                    <Link to="/create-ticket">
                                                        <div className="d-flex">
                                                            <div>
                                                                <h5 className="mb-2">Create Request</h5>
                                                                <p className="mb-0">Submit a new maintenance request.</p>
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
                                                                <h5 className="mb-2">Track Requests</h5>
                                                                <p className="mb-0">Follow the progress of your requests.</p>
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
                                                                <h5 className="mb-2">Request History</h5>
                                                                <p className="mb-0">Access your complete request history.</p>
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
                                                                <p className="mb-0">See interventions currently in progress.</p>
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
                                                                <h5 className="mb-2">Scheduled Interventions</h5>
                                                                <p className="mb-0">View your upcoming scheduled work.</p>
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
                                                                <h5 className="mb-2">Completed Work</h5>
                                                                <p className="mb-0">Review all completed interventions.</p>
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
                                            <span>How do I create a request?</span>
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
                                            You can create a new maintenance request by clicking "Create New Request" and filling in the details of the issue or service needed.
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
                                            Each request has real-time status updates. You can track progress, assigned technician, and estimated resolution time directly on the platform.
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
                                            <span>Can I cancel a request?</span>
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
                                            Yes, you can cancel a request before it's assigned to a technician. Once work has started, please contact support for assistance.
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

export default DashboardClient;
