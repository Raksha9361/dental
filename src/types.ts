export interface Case {
  id: string;
  patientName: string;
  patientId: string;
  tooth: string;
  date: string;
  status: 'Analyzed' | 'Pending' | 'In Progress';
  diagnosis?: string;
  confidence?: number;
  area?: string;
  diameter?: string;
  depthStage?: string;
  treatment?: string;
  treatmentPlan?: {
    step: number;
    description: string;
    timeline: string;
  }[];
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  license: string;
  avatar?: string;
}

export interface AppSettings {
  pushNotifications: boolean;
  autoSaveCases: boolean;
  darkMode: boolean;
}
