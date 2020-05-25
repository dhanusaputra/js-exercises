import React from "react";
import {  Header } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import { Patient } from "../types";
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
        </div>
      }
    </div>
  );
};

export default PatientPage;
