export type UserRole = 'student' | 'parent' | 'coordinator';

export interface User {
  id: string;
  role: UserRole;
  registrationNumber?: string;
  dateOfBirth?: string;
  email?: string;
  password: string;
}

export interface Student {
  id: string;
  userId: string;
  registrationNumber: string;
  name: string;
  photoUrl?: string;
  dateOfBirth: string;
  bloodGroup: string;
  phone: string;
  address: string;
  department: string;
  classSection: string;
  placementStatus: 'PLACED' | 'NOT PLACED';
  attendancePercentage: number;
  cgpa: number;
  overallRank: number;
}

export interface SemesterMarks {
  id: string;
  studentId: string;
  semesterNumber: number;
  cae1Marks: number;
  cae2Marks: number;
  endSemMarks: number;
  totalMarks: number;
  gpa: number;
  semesterRank: number;
}

export interface Achievement {
  id: string;
  studentId: string;
  type: 'internship' | 'hackathon' | 'certification' | 'extracurricular';
  title: string;
  description: string;
  achievementDate: string;
  certificateUrl?: string;
}

export interface Coordinator {
  id: string;
  userId: string;
  name: string;
  email: string;
  department: string;
  section: string;
}

export interface ParentMapping {
  parentUserId: string;
  studentId: string;
}

export interface ExcelRow {
  'Registration Number': string;
  'Name': string;
  'CAE 1': number;
  'CAE 2': number;
  'End Semester': number;
}
