import React from "react";
import axios from "axios";
import {  Header, Card, List } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Icon, SemanticCOLORS, Button, Grid } from "semantic-ui-react";

import { Patient, Entry, NewEntry, HealthCheckRating, Diagnosis } from "../types";
import { useStateValue, updatePatient } from "../state";
import AddEntryModal from "../AddEntryModal";
import { apiBaseUrl } from "../constants";

const PatientPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [modalType, setModalType] = React.useState<NewEntry['type']>("HealthCheck");
  const [error, setError] = React.useState<string | undefined>();

  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  const patient: Patient | undefined = Object.values(patients).find(p => p.id === id);
  if (!patient) {
    return null;
  }

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {

    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      const updatedPatient = { ...patient, entries: [ ...patient.entries, newEntry ] };
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <div className="App">
      {patient &&
        <div>
          <Header as="h2">{ patient.name } {patient.gender === 'male' ? <Icon name='mars' /> : <Icon name='venus' />}</Header>
          <div>ssn: { patient.ssn }</div>
          <div>occupation: { patient.occupation }</div>
          <Header as="h3">entries</Header>
          {patient.entries.map(entry => <EntryDetails key={ entry.id } entry={ entry } />)}
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
            modalType={modalType}
          />
          <Grid>
            <Grid.Column textAlign="center">
              <Button onClick={() => {openModal(); setModalType("Hospital");}}>Add New Hospital Entry</Button>
              <Button onClick={() => {openModal(); setModalType("OccupationalHealthcare");}}>Add New Occupational Healthcare Entry</Button>
              <Button onClick={() => {openModal(); setModalType("HealthCheck");}}>Add New Health Check Entry</Button>
            </Grid.Column>
          </Grid>
        </div>
      }
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const healthCheckColor = (rating: HealthCheckRating): SemanticCOLORS => {
  switch (rating) {
    case 0:
      return "green";
    case 1:
      return "yellow";
    case 2:
      return "orange";
    default:
      return "red";
  }
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  const diagnosesEntry: Diagnosis[] = Object.values(diagnoses).filter(diagnosis => entry.diagnosisCodes?.includes(diagnosis.code));

  switch (entry.type) {
    case "Hospital":
      return (
        <Card fluid>
          <Card.Content>
            <Card.Header>{entry.date} <Icon name='medkit' size='large' /></Card.Header> 
            <Card.Description>{entry.description} </Card.Description>
            <List bulleted>
              {diagnosesEntry.map(diagnosis => <List.Item key={diagnosis.code}>{diagnosis.code} {diagnosis.name}</List.Item>)} 
            </List>
          </Card.Content>
        </Card>
      );
    case "OccupationalHealthcare":
      return (
        <Card fluid>
          <Card.Content>
            <Card.Header>{entry.date} <Icon name='stethoscope' size='large' /> {entry.employerName}</Card.Header>
            <Card.Description>{entry.description}</Card.Description>
            <List bulleted>
              {diagnosesEntry.map(diagnosis => <List.Item key={diagnosis.code}>{diagnosis.code} {diagnosis.name}</List.Item>)} 
            </List>
          </Card.Content>
        </Card>
      );
    case "HealthCheck":
      return (
        <Card fluid>
          <Card.Content>
            <Card.Header>{entry.date} <Icon name='doctor' size='large' /></Card.Header>
            <Card.Description>{entry.description}</Card.Description>
            <List bulleted>
              {diagnosesEntry.map(diagnosis => <List.Item key={diagnosis.code}>{diagnosis.code} {diagnosis.name}</List.Item>)} 
            </List>
            <Icon name='heart' color={healthCheckColor(entry.healthCheckRating)} />
          </Card.Content>
        </Card>
      );
    default:
      return assertNever(entry);
  }
};

export default PatientPage;
