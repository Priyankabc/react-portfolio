
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ReactDOM from 'react-dom';

export default function ConfirmationDialog({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
       <Modal show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onConfirm}>
            OK
          </Button>
          <Button variant="primary"onClick={onClose}>
          Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      </>,
      document.getElementById('modal-root')
    );
}
 