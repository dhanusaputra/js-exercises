/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender, NewEntry, HealthCheckRating, Discharge } from './types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const toNewPatientEntry = (object: NewPatientEntry): NewPatientEntry => {
  return {
    name: parseString(object.name, 'name'),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn, 'ssn'),
    occupation: parseString(object.occupation, 'occupation'),
    gender: parseGender(object.gender),
    entries: [],
  };
};

export const toNewEntry = (object: NewEntry): NewEntry => {
  switch (object.type) {
    case "HealthCheck":
      return {
        description: parseString(object.description, 'description'),
        date: parseDate(object.date),
        specialist: parseString(object.specialist, 'specialist'),
        diagnosisCodes: object.diagnosisCodes,
        type: object.type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case "OccupationalHealthcare":
      return {
        description: parseString(object.description, 'description'),
        date: parseDate(object.date),
        specialist: parseString(object.specialist, 'specialist'),
        diagnosisCodes: object.diagnosisCodes,
        type: object.type,
        employerName: parseString(object.employerName, 'employerName'),
      };
    case "Hospital":
      return {
        description: parseString(object.description, 'description'),
        date: parseDate(object.date),
        specialist: parseString(object.specialist, 'specialist'),
        diagnosisCodes: object.diagnosisCodes,
        type: object.type,
        discharge: parseDischarge(object.discharge),
      };
    default:
      return assertNever(object);
  }
};

const parseDischarge = (object: Discharge): Discharge => {
  return {
    date: parseDate(object.date),
    criteria: parseString(object.criteria, 'criteria'),
  };
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: any, prop: string): string => {
  if(!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${prop}`);
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if  (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date as string}`);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender as string}`);
  }
  return gender;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (param: any): HealthCheckRating => {
  if (!param || !isHealthCheckRating(param)) {
    throw new Error(`Incorrect or missing healthCheckRating`);
  } 
  return param;
};
