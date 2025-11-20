import React from 'react';

const ConfirmDialog = ({ title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel' }) => (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{title}</h5>
                    <button type="button" className="btn-close" onClick={onCancel}></button>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>{cancelText}</button>
                    <button type="button" className="btn btn-primary" onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>
    </div>
);

export default ConfirmDialog;

