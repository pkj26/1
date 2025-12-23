import { TestPaper, User, UserRole } from './types';

export const APP_NAME = "CAexam.online";

export const MOCK_TESTS: TestPaper[] = [
  {
    id: 't1',
    title: 'Accounts Full Syllabus Test A',
    subject: 'Accounting',
    course: 'Inter',
    totalMarks: 100,
    durationMinutes: 180,
    scheduledDate: '2023-11-15',
    status: 'Live'
  },
  {
    id: 't2',
    title: 'Law Mock Test Series 1',
    subject: 'Corporate Law',
    course: 'Inter',
    totalMarks: 100,
    durationMinutes: 180,
    scheduledDate: '2023-11-20',
    status: 'Upcoming'
  },
  {
    id: 't3',
    title: 'Advanced Auditing Standards',
    subject: 'Audit',
    course: 'Final',
    totalMarks: 50,
    durationMinutes: 90,
    scheduledDate: '2023-11-10',
    status: 'Completed'
  }
];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Rahul Sharma',
  email: 'rahul.ca@example.com',
  mobile: '9876543210',
  city: 'Mumbai',
  role: UserRole.STUDENT,
  enrolledCourse: 'Inter',
  joinedAt: '2023-10-01T10:00:00Z'
};

export const MOCK_ADMIN: User = {
  id: 'a1',
  name: 'Admin User',
  email: 'admin@caexam.online',
  role: UserRole.ADMIN,
  joinedAt: '2023-01-01T10:00:00Z'
};

// SEO-optimized nav links
export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Test Series', path: '/#test-series' },
  { label: 'Benefits', path: '/#benefits' },
  { label: 'Features', path: '/#features' },
  { label: 'Copy Checker', path: '/#copy-checker' },
];