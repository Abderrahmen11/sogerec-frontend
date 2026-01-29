import React, { createContext, useState, useCallback } from 'react';
import ticketService from '../services/ticketService';

export const TicketContext = createContext();

export function TicketProvider({ children }) {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTickets = useCallback(async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const data = await ticketService.getAll(params);
            setTickets(data.data || data);
            return data;
        } catch (err) {
            setError(err.message || 'Failed to fetch tickets');
        } finally {
            setLoading(false);
        }

    }, []);

    const fetchTicketById = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await ticketService.getById(id);
            setSelectedTicket(data.data || data);
            return data;
        } catch (err) {
            setError(err.message || 'Failed to fetch ticket');
        } finally {
            setLoading(false);
        }

    }, []);

    const createTicket = useCallback(async (ticketData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await ticketService.create(ticketData);
            setTickets([...tickets, data.data || data]);
            return data;
        } catch (err) {
            setError(err.message || 'Failed to create ticket');
            throw err;
        } finally {
            setLoading(false);
        }

    }, [tickets]);

    const cancelTicket = useCallback(async (id, reason) => {
        setLoading(true);
        setError(null);
        try {
            // We'll use the updateStatus endpoint but also pass the reason
            const data = await ticketService.update(id, { status: 'closed', cancellation_reason: reason });
            setTickets(tickets.map(t => t.id === id ? data.data || data : t));
            if (selectedTicket?.id === id) setSelectedTicket(data.data || data);
            return data;
        } catch (err) {
            setError(err.message || 'Failed to cancel ticket');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [tickets, selectedTicket]);

    const value = {
        tickets,
        selectedTicket,
        loading,
        error,
        fetchTickets,
        fetchTicketById,
        createTicket,
        updateTicket,
        cancelTicket,
    };

    return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
}

export default TicketContext;

