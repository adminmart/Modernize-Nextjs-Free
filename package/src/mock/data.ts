// Types
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
  cabinetId: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  students: string[]; // Array of student IDs
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
  status: 'completed' | 'pending' | 'failed';
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
    name: 'Advanced Mathematics',
    teacher: 'Dr. Robert Brown',
    subject: 'Mathematics',
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
    ],
    students: ['1', '2'],
  },
  {
    id: '2',
    name: 'English Literature',
    teacher: 'Ms. Emily White',
    subject: 'English',
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
    ],
    students: ['1'],
  },
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    studentId: '1',
    amount: 500,
    date: '2024-02-01',
    status: 'completed',
    method: 'card',
    description: 'February Tuition Fee',
  },
  {
    id: '2',
    studentId: '2',
    amount: 500,
    date: '2024-02-01',
    status: 'pending',
    method: 'transfer',
    description: 'February Tuition Fee',
  },
];