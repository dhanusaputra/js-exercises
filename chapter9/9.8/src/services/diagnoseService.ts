import diagnoseData from '../../data/diagnoses.json';
import { DiagnoseEntry } from '../types';

const diagnoses: Array<DiagnoseEntry> = diagnoseData as Array<DiagnoseEntry>;

const getEntries = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

const addEntry = (): DiagnoseEntry => {
  return null;
};

export default {
  getEntries,
  addEntry,
};
