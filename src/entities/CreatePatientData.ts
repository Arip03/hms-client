import type { Gender } from "./Gender";

export interface CreatePatientData {
    firstName: string;
    fatherName: string;
    lastName: string;
    personalNumber: string;
    gender: Gender;
    dateOfBirth: string; 
    address: string;
    phone: string;
    email: string;
    maritalStatus: string;
    occupation: string;
    insuranceNumber: string;
  }
  