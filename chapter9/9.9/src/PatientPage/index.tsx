import React from "react";
import {  Header, Card, List } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Icon, SemanticCOLORS } from "semantic-ui-react";

import { Patient, Entry, HealthCheckRating, Diagnosis } from "../types";
import { useStateValue } from "../state";

const PatientPage: React.FC = () => {
  const [{ patients }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient: Patient | undefined = Object.values(patients).find(p => p.id === id);

  return (
    <div className="App">
      {patient &&
        <div>
        <Header as="h2">{ patient.name } {patient.gender === 'male' ? <Icon name='mars' /> : <Icon name='venus' />}</Header>
        <div>ssn: { patient.ssn }</div>
        <div>occupation: { patient.occupation }</div>
        <Header as="h3">entries</Header>
        {patient.entries.map(entry => <EntryDetails key={ entry.id } entry={ entry } />)}
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
