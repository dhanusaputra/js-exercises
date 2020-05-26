import patientData from '../../data/patients';
import { Entry, PatientEntry, NonSensitivePatientEntry, NewPatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<PatientEntry> = patientData;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getEntryById = (id: number): Patient => {
  return { ...patients.find(p => p.id === id) };
};

const getEntryOnlyById = (id: number): Entry[] => {
  return patients.find(p => p.id === id).entries;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(patient => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getEntryById,
  getEntryOnlyById,
};
