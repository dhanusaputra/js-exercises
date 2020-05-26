import React from "react";
import {  Header } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import { Patient, Entry } from "../types";
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

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <div>
          {entry.date} {entry.description} 
          <ul>
            {entry.diagnosisCodes?.map(diagnosisCode => <li key={diagnosisCode}>{diagnosisCode}</li>)} 
          </ul>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          {entry.date} {entry.description} 
          <ul>
            {entry.diagnosisCodes?.map(diagnosisCode => <li key={diagnosisCode}>{diagnosisCode}</li>)} 
          </ul>
        </div>
      );
    case "HealthCheck":
      return (<div>{entry.date} {entry.description}</div>);
    default:
      return assertNever(entry);
  }
};

export default PatientPage;
