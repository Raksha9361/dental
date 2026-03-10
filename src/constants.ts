import { Case, UserProfile } from './types';

export const MOCK_USER: UserProfile = {
  name: 'Dr. Smith',
  email: 'dr.smith@dental.com',
  role: 'General Dentist',
  license: 'DDS-4821',
};

export const MOCK_CASES: Case[] = [
  {
    id: 'RPT-2026-0303-001',
    patientName: 'Sarah Johnson',
    patientId: 'PT-2024-001',
    tooth: '#14 (Upper Left)',
    date: '2026-03-02',
    status: 'Analyzed',
    diagnosis: 'Moderate Occlusal Cavity',
    confidence: 94.7,
    area: '12.4 mm²',
    diameter: '3.97 mm',
    depthStage: 'D2 — Dentin',
    treatment: 'Composite Restoration',
    treatmentPlan: [
      { step: 1, description: 'Local anesthesia administration', timeline: 'Day 1' },
      { step: 2, description: 'Caries removal with dental drill', timeline: 'Day 1' },
      { step: 3, description: 'Composite resin placement', timeline: 'Day 1' },
      { step: 4, description: 'Post-treatment X-ray', timeline: 'Day 1' },
      { step: 5, description: 'Follow-up assessment', timeline: 'Week 4' },
    ],
  },
  {
    id: 'RPT-2026-0301-002',
    patientName: 'Michael Chen',
    patientId: 'PT-2024-005',
    tooth: '#22',
    date: '2026-03-01',
    status: 'Pending',
  },
  {
    id: 'RPT-2026-0228-003',
    patientName: 'Emma Williams',
    patientId: 'PT-2023-112',
    tooth: '#7',
    date: '2026-02-28',
    status: 'In Progress',
  },
];
