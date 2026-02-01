import React from 'react';

const Documentation = () => {
    return (
        <main className="container py-5" style={{ minHeight: '100vh' }}>
            <div className="row">
                <div className="col-12">
                    <h1 style={{ fontWeight: 700 }}>SogeRec — Documentation</h1>
                    <p className="text-muted">Complete project documentation, usage guides, API reference and troubleshooting.</p>

                    <nav aria-label="Table of contents" className="my-4">
                        <ul>
                            <li><a href="#overview">Overview</a></li>
                            <li><a href="#quickstart">Quick start</a></li>
                            <li><a href="#architecture">Architecture</a></li>
                            <li><a href="#installation">Installation</a></li>
                            <li><a href="#running">Running the project</a></li>
                            <li><a href="#auth-roles">Authentication & Roles</a></li>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#api-reference">API reference</a></li>
                            <li><a href="#frontend-usage">Frontend usage</a></li>
                            <li><a href="#troubleshooting">Troubleshooting</a></li>
                            <li><a href="#contributing">Contributing</a></li>
                            <li><a href="#faqs">FAQs</a></li>
                        </ul>
                    </nav>

                    <section id="overview" className="mb-4">
                        <h2>Overview</h2>
                        <p>SogeRec is a facility maintenance management platform providing ticketing, planning, intervention tracking, reporting and multi-role access (clients, technicians, admins). The backend is built with Laravel and the frontend with React + Vite.</p>
                    </section>

                    <section id="quickstart" className="mb-4">
                        <h2>Quick start</h2>
                        <p>Clone both repositories, install dependencies and configure environment variables for the backend. Basic steps:</p>
                        <ol>
                            <li>Clone the repositories: backend and frontend.</li>
                            <li>Configure the backend `.env` (database, mail, queue).</li>
                            <li>Run backend migrations & seeders: <code>php artisan migrate --seed</code>.</li>
                            <li>Install frontend dependencies and run dev server.</li>
                        </ol>
                    </section>

                    <section id="architecture" className="mb-4">
                        <h2>Architecture</h2>
                        <p>Key components:</p>
                        <ul>
                            <li><strong>Backend:</strong> Laravel app in `sogerec-backend/` exposes REST API, handles auth, notifications, events and business logic.</li>
                            <li><strong>Frontend:</strong> React app in `sogerec-frontend/` (Vite) consumes the API and provides the UI.</li>
                            <li><strong>Database:</strong> MySQL (configured in Laravel `.env`).</li>
                        </ul>
                    </section>

                    <section id="installation" className="mb-4">
                        <h2>Installation</h2>
                        <h5>Backend</h5>
                        <pre>
                            {`cd sogerec-backend
composer install
cp .env.example .env
php artisan key:generate
`}
                        </pre>
                        <p>Set the DB credentials in `.env`, then run:</p>
                        <pre>
                            {`php artisan migrate
php artisan db:seed
`}
                        </pre>

                        <h5>Frontend</h5>
                        <pre>
                            {`cd sogerec-frontend
npm install
npm run dev
`}
                        </pre>
                    </section>

                    <section id="running" className="mb-4">
                        <h2>Running the project</h2>
                        <p>Run the Laravel server and the Vite dev server concurrently during development:</p>
                        <pre>
                            {`# Backend
php artisan serve --port=8000

# Frontend
npm run dev
`}
                        </pre>
                        <p>Adjust the frontend `services/api` base URL to point to the backend host if needed.</p>
                    </section>

                    <section id="auth-roles" className="mb-4">
                        <h2>Authentication & Roles</h2>
                        <p>SogeRec implements role-based access control. Typical roles:</p>
                        <ul>
                            <li><strong>client</strong> — can create tickets and view own data.</li>
                            <li><strong>technician</strong> — can view assigned interventions, update status.</li>
                            <li><strong>admin</strong> — full access, generate reports, manage users.</li>
                        </ul>
                        <p>Frontend guards routes using `PrivateRoute` and role props. The `useRoleAccess` hook exposes role-check helpers used across pages.</p>
                    </section>

                    <section id="features" className="mb-4">
                        <h2>Features</h2>
                        <ul>
                            <li>Ticket creation & lifecycle</li>
                            <li>Intervention assignment & tracking</li>
                            <li>Calendar planning</li>
                            <li>Real-time notifications</li>
                            <li>Reporting & analytics</li>
                        </ul>
                    </section>

                    <section id="api-reference" className="mb-4">
                        <h2>API reference (summary)</h2>
                        <p>The backend exposes REST endpoints under `/api`. Common endpoints:</p>
                        <ul>
                            <li><code>POST /api/login</code> — authenticate and receive token</li>
                            <li><code>GET /api/tickets</code> — list tickets (auth)</li>
                            <li><code>GET /api/interventions</code> — list interventions (auth)</li>
                            <li><code>GET /api/reports</code> — list reports (admin)</li>
                            <li><code>POST /api/notifications</code> — send notification</li>
                        </ul>
                        <p>See backend controllers and routes for complete details: [sogerec-backend/routes/api.php](../sogerec-backend/routes/api.php) (open in code editor).</p>
                    </section>

                    <section id="frontend-usage" className="mb-4">
                        <h2>Frontend usage</h2>
                        <p>The frontend organizes pages under `src/pages`. Key helpers:</p>
                        <ul>
                            <li><code>src/services/api</code>: central axios instance — update base URL here.</li>
                            <li><code>src/hooks/useAuth</code>: authentication state and token management.</li>
                            <li><code>src/router/AppRouter.jsx</code>: route definitions and `PrivateRoute` usage.</li>
                        </ul>

                        <h5>Docs & Support</h5>
                        <p>Use the documentation page anchors for quick navigation and the contact form on the home page to open support tickets.</p>
                    </section>

                    <section id="troubleshooting" className="mb-4">
                        <h2>Troubleshooting</h2>
                        <h6>Reports page re-renders continuously</h6>
                        <p>Issue: The reports page may re-run its data fetch if the effect depends on a function returned from a hook (its identity can change every render). Fix: depend on a stable boolean (e.g. `const admin = isAdmin()`), then use that boolean in the effect dependency array.</p>

                        <h6>Common fixes</h6>
                        <ul>
                            <li>Ensure `.env` values are correct and database reachable.</li>
                            <li>Clear cache: <code>php artisan config:cache</code> and <code>php artisan cache:clear</code>.</li>
                            <li>Check browser console for CORS or authentication errors when the frontend cannot reach the API.</li>
                        </ul>
                    </section>

                    <section id="contributing" className="mb-4">
                        <h2>Contributing</h2>
                        <p>Contributions are welcome. Follow these guidelines:</p>
                        <ul>
                            <li>Open an issue for the feature or bug first.</li>
                            <li>Create a feature branch and open a pull request against the default branch.</li>
                            <li>Keep changes focused and add tests for backend features where applicable.</li>
                        </ul>
                    </section>

                    <section id="faqs" className="mb-4">
                        <h2>FAQs</h2>
                        <h6>How do I create a user?</h6>
                        <p>Admins can create users from the Users page. Use the "Create" action under the admin menu.</p>
                        <h6>Where are reports generated?</h6>
                        <p>Reports are generated via the Reports page (admin) and can be exported or viewed.</p>
                    </section>

                </div>
            </div>
        </main>
    );
};

export default Documentation;
