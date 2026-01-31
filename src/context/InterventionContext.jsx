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
            setInterventions(Array.isArray(data) ? data : (data.data || data));
            return data;
        } catch (err) {
            setError(err.message || 'Failed to fetch interventions');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchPlanning = useCallback(async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const data = await interventionService.getPlanning(params);
            const list = Array.isArray(data) ? data : (data.data || data);
            setInterventions(list);
            return list;
        } catch (err) {
            setError(err.message || 'Failed to fetch planning');
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
            const intervention = data?.intervention ?? data?.data ?? data;
            if (intervention) {
                // Add the new intervention to state
                setInterventions(prev => [...prev.filter(i => i.id !== intervention.id), intervention]);
                // Refetch the complete list to ensure consistency with backend
                setTimeout(() => {
                    fetchInterventions();
                }, 500);
            }
            return data;
        } catch (err) {
            setError(err.message || err.response?.data?.message || 'Failed to create intervention');
            throw err;
        } finally {
            setLoading(false);
        }

    }, [fetchInterventions]);

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

    const updateInterventionStatus = useCallback(async (id, status) => {
        setLoading(true);
        setError(null);
        try {
            const data = await interventionService.updateStatus(id, status);
            setInterventions(prev => prev.map(i => i.id === id ? { ...i, status } : i));
            return data;
        } catch (err) {
            setError(err.message || 'Failed to update intervention status');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const submitInterventionReport = useCallback(async (id, report) => {
        setLoading(true);
        setError(null);
        try {
            const payload = typeof report === 'object' && report?.report != null
                ? report
                : { report: String(report ?? '') };
            const data = await interventionService.submitReport(id, payload);
            setInterventions(prev => prev.map(i => i.id === id ? { ...i, status: 'completed' } : i));
            setSelectedIntervention(prev => prev?.id === id ? { ...prev, status: 'completed' } : prev);
            return data;
        } catch (err) {
            setError(err.message || 'Failed to submit report');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const value = {
        interventions,
        selectedIntervention,
        loading,
        error,
        fetchInterventions,
        fetchPlanning,
        fetchInterventionById,
        createIntervention,
        updateIntervention,
        updateInterventionStatus,
        submitInterventionReport,
    };


    return <InterventionContext.Provider value={value}>{children}</InterventionContext.Provider>;
}

export default InterventionContext;

