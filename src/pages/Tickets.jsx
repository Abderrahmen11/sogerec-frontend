import React, { useEffect } from 'react';
import useTickets from '../hooks/useTickets';
import TicketList from '../components/tickets/TicketList';

const Tickets = () => {
    const { fetchTickets, tickets, loading } = useTickets();

    useEffect(() => {
        fetchTickets();
    }, []);

    return (
        <div className="container-fluid py-5">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>My Tickets</h1>
                        <button className="btn btn-primary">New Ticket</button>
                    </div>
                </div>
            </div>
            {loading ? (
                <div className="text-center">Loading tickets...</div>
            ) : (
                <TicketList tickets={tickets} />
            )}
        </div>
    );
};

export default Tickets;

