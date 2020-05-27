import patientData from '../../data/patients';
import { Entry, PatientEntry, NonSensitivePatientEntry, NewPatientEntry, Patient, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';

let patients: Array<PatientEntry> = patientData;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getEntryById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const getEntryOnlyById = (id: string): Entry[] | undefined => {
  return patients.find(p => p.id === id)?.entries;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(patient => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: patient.entries,
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

const addEntry = (entry: NewEntry, id: string): Entry => {
  const updatedPatient = patients.find(p => p.id === id);
  if (!updatedPatient) {
    throw new Error(`Cannot find patient with id: ${id}`);
  }

  const newEntry = {
    id: uuid(),
    ...entry
  };

  updatedPatient.entries.push(newEntry);
  patients = patients.map(p => p.id === id ? updatedPatient : p);
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  addEntry,
  getEntryById,
  getEntryOnlyById,
};
