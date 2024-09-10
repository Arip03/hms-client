import type { Allergy } from "./Allergy";
import type { ChronicDisease } from "./ChronicDisease";
import type { MedicalHistory } from "./MedicalHistory";

export interface PatientViewData {
    id: string;
    firstName: string;
    lastName: string;
    fatherName: string;
    personalNumber: string;
    gender: string;
    dateOfBirth: number;
    address: string;
    phone: string;
    email: string;
    allergies: Allergy[];
    chronicDiseases: ChronicDisease[];
    history: MedicalHistory[];
}