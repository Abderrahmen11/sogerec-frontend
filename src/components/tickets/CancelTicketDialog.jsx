import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Box,
    Typography
} from '@mui/material';

const REASONS = [
    'Change of plans',
    'Found another solution',
    'Incorrect information',
    'Service no longer needed',
    'Other'
];

const CancelTicketDialog = ({ open, onClose, onConfirm, ticketId }) => {
    const [reason, setReason] = useState('');
    const [otherReason, setOtherReason] = useState('');

    const handleConfirm = () => {
        const finalReason = reason === 'Other' ? otherReason : reason;
        onConfirm(ticketId, finalReason);
        setReason('');
        setOtherReason('');
    };

    const handleClose = () => {
        setReason('');
        setOtherReason('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontWeight: 'bold', color: '#dc3545' }}>
                Cancel Ticket #{ticketId}
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    Are you sure you want to cancel this ticket? This action cannot be undone.
                </Typography>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="reason-label">Reason for Cancellation</InputLabel>
                    <Select
                        labelId="reason-label"
                        value={reason}
                        label="Reason for Cancellation"
                        onChange={(e) => setReason(e.target.value)}
                    >
                        {REASONS.map((r) => (
                            <MenuItem key={r} value={r}>{r}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {reason === 'Other' && (
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Please specify"
                        variant="outlined"
                        value={otherReason}
                        onChange={(e) => setOtherReason(e.target.value)}
                        placeholder="Tell us why you are cancelling..."
                    />
                )}
            </DialogContent>
            <DialogActions sx={{ p: 2, pt: 0 }}>
                <Button onClick={handleClose} color="inherit">
                    No, Keep Ticket
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    color="error"
                    disabled={!reason || (reason === 'Other' && !otherReason.trim())}
                >
                    Yes, Cancel Ticket
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CancelTicketDialog;
