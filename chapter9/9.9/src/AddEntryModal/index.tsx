import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { AddHospitalEntryForm, AddHealthCheckEntryForm, AddOccupationalHealthcareEntryForm } from './AddEntryForm';
import { NewEntry } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
  modalType: NewEntry['type'];
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, modalType, error }: Props) => {
  switch (modalType) {
    case "HealthCheck":
      return (
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
          <Modal.Header>Add a new Health Check Entry</Modal.Header>
          <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
          </Modal.Content>
        </Modal>
      );
    case "OccupationalHealthcare":
      return (
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
          <Modal.Header>Add a new Occupational Healthcare Entry</Modal.Header>
          <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddOccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onClose} />
          </Modal.Content>
        </Modal>
      );
    case "Hospital":
      return (
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
          <Modal.Header>Add a Hospital Entry</Modal.Header>
          <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
          </Modal.Content>
        </Modal>
      );
  }
};

export default AddEntryModal;
