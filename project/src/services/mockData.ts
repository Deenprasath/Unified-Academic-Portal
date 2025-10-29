import { User, Student, SemesterMarks, Coordinator, ParentMapping } from '../types';

const firstNames = [
  'Chintala', 'Chintala', 'Chinthalapall', 'Chintlu', 'Chittathur', 'Chittiboina', 'D', 'D', 'DA', 'Dangeti',
  'Daran', 'Darvin', 'Dasari', 'Deenprasath', 'Deepak', 'Deepak', 'Deepesh', 'Dennis', 'Denzo', 'Deva',
  'Devadarshan', 'Devadharshan', 'Devarapalli', 'Devi', 'Devineni', 'Dhanraj', 'Dhanush', 'Dhanvanth', 'Dharmesh', 'Dhasendar',
  'Dhinesh', 'Dhinesh', 'Dinesh', 'Dokala', 'Dokku', 'Dominic', 'Dommaraju', 'Don', 'Don', 'Duvvu',
  'Evancy', 'Evangeline', 'Ezhisaivani', 'Farrah', 'Fastina', 'Febi', 'Fiona', 'G', 'Ganjinaboyina', 'Ganta',
  'Gayathri', 'Geddamuri', 'Gopika', 'Harini', 'Harini', 'Harini', 'Doneti', 'Dontheboina', 'Dulam', 'Roshan'
];

const lastNames = [
  'Bhargeshwara Rao', 'Krishna Vamsi', 'Patta Dushyanth Varma', 'Thrinadh', 'Kailash Babu', 'Satya Surya Prudhvi', 'Baskar', 'Manikanta Teja', 'Rohit', 'Uma Maheshwara Rao',
  'Raina P', 'Anjo J', 'Venkata Sai Nithish', 'S', 'R', 'R N', 'K', 'Melvin Mahendran', 'Francis', 'Soorya P V',
  'R', 'J', 'Satya Sai Kumar', 'Prasad B', 'Vishnu', 'Adithya M', 'Kanth TR', 'Ram S', 'J', 'M',
  'M', 'Soundarajan', 'V', 'Baswanth', 'Lokesh', 'KJ', 'Yugendar', 'Cornelius B', 'Stephin T', 'Raga Amrutha',
  'Iniya IR', 'Mizpah A', 'M', 'Y', 'F', 'B', 'Ghosh', 'Sakthi Priya', 'Meghana Sai Sri', 'Venkata Akshaya Padmavalli',
  'U', 'Swathi', 'S', 'M', 'S', 'S', 'Shiva Rama Chandra', 'Bharath Kumar', 'Vishal', 'Vikas NV'
];


const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const addresses = [
  '123 MG Road, Bangalore', '456 Anna Salai, Chennai', '789 Park Street, Kolkata',
  '321 Marine Drive, Mumbai', '654 Mall Road, Shimla', '987 Residency Road, Bangalore',
  '147 Brigade Road, Bangalore', '258 Connaught Place, Delhi', '369 Linking Road, Mumbai',
  '741 Carter Road, Mumbai'
];

export function generateMockStudents(): Student[] {
  const students: Student[] = [];

  for (let i = 1; i <= 60; i++) {
    const regNumber = `43110${String(i).padStart(2, '0')}`;
    const firstName = firstNames[i - 1];
    const lastName = lastNames[i - 1];

    students.push({
      id: `student-${i}`,
      userId: `user-${i}`,
      registrationNumber: regNumber,
      name: `${firstName} ${lastName}`,
      photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}`,
      dateOfBirth: `${1999 + Math.floor(i / 30)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      bloodGroup: bloodGroups[i % bloodGroups.length],
      phone: `+91 ${9000000000 + i}`,
      address: addresses[i % addresses.length],
      department: 'Computer Science Engineering',
      classSection: 'A4',
      placementStatus: i % 3 === 0 ? 'PLACED' : 'NOT PLACED',
      attendancePercentage: 75 + Math.floor(Math.random() * 20),
      cgpa: 0,
      overallRank: 0
    });
  }

  return students;
}

export function generateMockMarks(): SemesterMarks[] {
  const marks: SemesterMarks[] = [];
  let markId = 1;

  for (let studentNum = 1; studentNum <= 60; studentNum++) {
    for (let sem = 1; sem <= 8; sem++) {
      const basePerformance = 30 + Math.floor(Math.random() * 15);
      const cae1 = Math.min(50, basePerformance + Math.floor(Math.random() * 10));
      const cae2 = Math.min(50, basePerformance + Math.floor(Math.random() * 10));
      const endSem = Math.min(100, (basePerformance * 2) + Math.floor(Math.random() * 20));
      const total = cae1 + cae2 + endSem;
      const gpa = (total / 200) * 10;

      marks.push({
        id: `mark-${markId++}`,
        studentId: `student-${studentNum}`,
        semesterNumber: sem,
        cae1Marks: cae1,
        cae2Marks: cae2,
        endSemMarks: endSem,
        totalMarks: total,
        gpa: parseFloat(gpa.toFixed(2)),
        semesterRank: 0
      });
    }
  }

  return marks;
}

export function generateMockUsers(): User[] {
  const users: User[] = [];

  for (let i = 1; i <= 60; i++) {
    const regNumber = `43110${String(i).padStart(2, '0')}`;
    users.push({
      id: `user-${i}`,
      role: 'student',
      registrationNumber: regNumber,
      dateOfBirth: `${1999 + Math.floor(i / 30)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      password: `student${i}@123`
    });

    users.push({
      id: `parent-user-${i}`,
      role: 'parent',
      registrationNumber: regNumber,
      dateOfBirth: `${1999 + Math.floor(i / 30)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      password: `parent${i}@123`
    });
  }

  users.push({
    id: 'coordinator-user-1',
    role: 'coordinator',
    email: 'coordinator@college.edu',
    password: 'coord@123'
  });

  return users;
}

export function generateMockCoordinators(): Coordinator[] {
  return [{
    id: 'coord-1',
    userId: 'coordinator-user-1',
    name: 'Dr. Saranya S',
    email: 'coordinator@college.edu',
    department: 'Computer Science Engineering',
    section: 'Section A4'
  }];
}

export function generateParentMappings(): ParentMapping[] {
  const mappings: ParentMapping[] = [];

  for (let i = 1; i <= 60; i++) {
    mappings.push({
      parentUserId: `parent-user-${i}`,
      studentId: `student-${i}`
    });
  }

  return mappings;
}
