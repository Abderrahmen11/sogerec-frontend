import React, { createContext, useState, useCallback } from 'react';
import interventionService from '../services/interventionService';

export const InterventionContext = createContext();

export function InterventionProvider({ children }) {
    const [interventions, setInterventions] = useState([]);
    const [selectedIntervention, setSelectedIntervention] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchInterventions = useCallback(async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const data = await interventionService.getAll(params);
            setInterventions(data.data || data);
            return data;
        } catch (err) {
            setError(err.message || 'Failed to fetch interventions');
        } finally {
            setLoading(false);
        }

    }, []);

    const fetchInterventionById = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await interventionService.getById(id);
            setSelectedIntervention(data.data || data);
            return data;
        } catch (err) {
            setError(err.message || 'Failed to fetch intervention');
        } finally {
            setLoading(false);
        }

    }, []);

    const createIntervention = useCallback(async (interventionData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await interventionService.create(interventionData);
            setInterventions([...interventions, data.data || data]);
            return data;
        } catch (err) {
            setError(err.message || 'Failed to create intervention');
            throw err;
        } finally {
            setLoading(false);
        }

    }, [interventions]);

    const updateIntervention = useCallback(async (id, interventionData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await interventionService.update(id, interventionData);
            setInterventions(interventions.map(i => i.id === id ? data.data || data : i));
            if (selectedIntervention?.id === id) setSelectedIntervention(data.data || data);
            return data;
        } catch (err) {
            setError(err.message || 'Failed to update intervention');
            throw err;
        } finally {
            setLoading(false);
        }

    }, [interventions, selectedIntervention]);

    const value = {
        interventions,
        selectedIntervention,
        loading,
        error,
        fetchInterventions,
        fetchInterventionById,
        createIntervention,
        updateIntervention,
    };

    return <InterventionContext.Provider value={value}>{children}</InterventionContext.Provider>;
}

export default InterventionContext;

