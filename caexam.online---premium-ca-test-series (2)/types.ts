
export enum UserRole {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  mobile?: string; // New field
  city?: string;   // New field
  role: UserRole;
  avatar?: string;
  enrolledCourse?: 'Foundation' | 'Inter' | 'Final';
  joinedAt?: string; // New field for tracking
}

export interface TestPaper {
  id: string;
  title: string;
  subject: string;
  course: 'Foundation' | 'Inter' | 'Final';
  totalMarks: number;
  durationMinutes: number;
  scheduledDate: string;
  status: 'Upcoming' | 'Live' | 'Completed';
  pdfUrl?: string; // Mock URL
}

export interface TestAttempt {
  id: string;
  testId: string;
  studentId: string;
  submittedAt: string;
  marksObtained?: number;
  status: 'Submitted' | 'Evaluated' | 'Pending';
  feedback?: string;
  answerSheetUrl?: string;
}

export interface AnalyticsData {
  date: string;
  students: number;
  uploads: number;
}
