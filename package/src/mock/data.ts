// Types
export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subjects: string[];
  qualifications: string[];
  joinDate: string;
  status: 'active' | 'inactive';
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'active' | 'inactive';
  paymentStatus: 'paid' | 'pending' | 'overdue';
}

export interface Class {
  id: string;
  name: string;
  teacher: string;
  subject: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'IELTS';
  cabinetId: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  students: string[]; // Array of student IDs
  courseAmount: number;
  createdAt: number;
  openingDate?: string;
}

export interface Cabinet {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
  status: 'available' | 'occupied' | 'maintenance';
  location: string;
}

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  date: string;
  status: 'paid' | 'unpaid';
  method: 'cash' | 'card' | 'transfer';
  description: string;
}

// Mock Data
export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1234567890',
    joinDate: '2024-01-15',
    status: 'active',
    paymentStatus: 'paid',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1234567891',
    joinDate: '2024-01-20',
    status: 'active',
    paymentStatus: 'pending',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '+1234567892',
    joinDate: '2024-01-25',
    status: 'active',
    paymentStatus: 'paid',
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    phone: '+1234567893',
    joinDate: '2024-02-01',
    status: 'active',
    paymentStatus: 'overdue',
  },
];

export const mockCabinets: Cabinet[] = [
  {
    id: '1',
    name: 'Room 101',
    capacity: 20,
    equipment: ['Projector', 'Whiteboard', 'Computers'],
    status: 'available',
    location: '1st Floor',
  },
  {
    id: '2',
    name: 'Room 102',
    capacity: 15,
    equipment: ['Whiteboard', 'Smart TV'],
    status: 'occupied',
    location: '1st Floor',
  },
];

export const mockClasses: Class[] = [
  {
    id: '1',
    name: 'A1 English Basics',
    teacher: 'Dr. Robert Brown',
    subject: 'English',
    level: 'A1',
    cabinetId: '1',
    schedule: [
      {
        day: 'Monday',
        startTime: '09:00',
        endTime: '10:30',
      },
      {
        day: 'Wednesday',
        startTime: '09:00',
        endTime: '10:30',
      },
      {
        day: 'Friday',
        startTime: '09:00',
        endTime: '10:30',
      },
    ],
    students: ['1', '2'],
    courseAmount: 500000,
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
    openingDate: new Date().toISOString().split('T')[0],
  },
  {
    id: '2',
    name: 'B2 Advanced English',
    teacher: 'Ms. Emily White',
    subject: 'English',
    level: 'B2',
    cabinetId: '2',
    schedule: [
      {
        day: 'Tuesday',
        startTime: '11:00',
        endTime: '12:30',
      },
      {
        day: 'Thursday',
        startTime: '11:00',
        endTime: '12:30',
      },
      {
        day: 'Saturday',
        startTime: '11:00',
        endTime: '12:30',
      },
    ],
    students: ['3', '4'],
    courseAmount: 700000,
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
  },
  {
    id: '3',
    name: 'IELTS Preparation',
    teacher: 'Dr. Robert Brown',
    subject: 'English',
    level: 'IELTS',
    cabinetId: '1',
    schedule: [
      {
        day: 'Tuesday',
        startTime: '09:00',
        endTime: '10:30',
      },
      {
        day: 'Thursday',
        startTime: '09:00',
        endTime: '10:30',
      },
      {
        day: 'Saturday',
        startTime: '09:00',
        endTime: '10:30',
      },
    ],
    students: ['1', '4'],
    courseAmount: 900000,
    createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
  },
];

export const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Robert Brown',
    email: 'robert.brown@example.com',
    phone: '+1234567894',
    subjects: ['English'],
    qualifications: ['PhD in English Literature', 'CELTA', 'DELTA'],
    joinDate: '2023-09-01',
    status: 'active',
  },
  {
    id: '2',
    name: 'Ms. Emily White',
    email: 'emily.white@example.com',
    phone: '+1234567895',
    subjects: ['English'],
    qualifications: ['MA in TESOL', 'CELTA'],
    joinDate: '2023-10-15',
    status: 'active',
  },
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    studentId: '1',
    amount: 500000,
    date: '2024-02-01',
    status: 'paid',
    method: 'card',
    description: 'February Tuition Fee',
  },
  {
    id: '2',
    studentId: '2',
    amount: 500000,
    date: '2024-02-01',
    status: 'unpaid',
    method: 'transfer',
    description: 'February Tuition Fee',
  },
];