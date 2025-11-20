import React, { useState } from 'react';

const ResetPassword = ({ onSubmit, loading }) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(email);
        setSubmitted(true);
    };

    return (
        <form onSubmit={handleSubmit} >
            {!submitted ? (
                <>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? 'Sending...' : 'Reset Password'}
                    </button>
                </>
            ) : (
                <div className="alert alert-info">Check your email for password reset instructions.</div>
            )}
        </form>
    );
};

export default ResetPassword;

