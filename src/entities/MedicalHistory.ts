export interface MedicalHistory {
    id: string;
    visitDate: number;
    doctorDescription: string;
    nurseWork: string | null;
    diagnosis: string;
    treatment: string;
    prescription: string;
  }