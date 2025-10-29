import { Student, SemesterMarks, Achievement, User, Coordinator, ParentMapping } from '../types';
import { generateMockStudents, generateMockMarks, generateMockUsers, generateMockCoordinators, generateParentMappings } from './mockData';

class DataService {
  private students: Student[] = [];
  private marks: SemesterMarks[] = [];
  private achievements: Achievement[] = [];
  private users: User[] = [];
  private coordinators: Coordinator[] = [];
  private parentMappings: ParentMapping[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    const savedData = localStorage.getItem('academicPortalData');

    if (savedData) {
      const data = JSON.parse(savedData);
      this.students = data.students || [];
      this.marks = data.marks || [];
      this.achievements = data.achievements || [];
      this.users = data.users || [];
      this.coordinators = data.coordinators || [];
      this.parentMappings = data.parentMappings || [];
    } else {
      this.students = generateMockStudents();
      this.marks = generateMockMarks();
      this.achievements = [];
      this.users = generateMockUsers();
      this.coordinators = generateMockCoordinators();
      this.parentMappings = generateParentMappings();

      this.calculateCGPAAndRanks();
      this.saveData();
    }
  }

  private saveData() {
    const data = {
      students: this.students,
      marks: this.marks,
      achievements: this.achievements,
      users: this.users,
      coordinators: this.coordinators,
      parentMappings: this.parentMappings
    };
    localStorage.setItem('academicPortalData', JSON.stringify(data));
  }

  calculateCGPAAndRanks() {
    this.students.forEach(student => {
      const studentMarks = this.marks.filter(m => m.studentId === student.id);
      const validGPAs = studentMarks.map(m => m.gpa).filter(gpa => gpa > 0);
      student.cgpa = validGPAs.length > 0
        ? parseFloat((validGPAs.reduce((a, b) => a + b, 0) / validGPAs.length).toFixed(2))
        : 0;
    });

    const sortedStudents = [...this.students].sort((a, b) => b.cgpa - a.cgpa);
    sortedStudents.forEach((student, index) => {
      student.overallRank = index + 1;
    });

    for (let sem = 1; sem <= 8; sem++) {
      const semMarks = this.marks.filter(m => m.semesterNumber === sem);
      const sorted = [...semMarks].sort((a, b) => b.gpa - a.gpa);
      sorted.forEach((mark, index) => {
        mark.semesterRank = index + 1;
      });
    }

    this.saveData();
  }

  authenticateUser(registrationNumber: string, password: string): User | null {
    const user = this.users.find(u =>
      (u.registrationNumber === registrationNumber || u.email === registrationNumber) &&
      u.password === password
    );
    return user || null;
  }

  getStudentByUserId(userId: string): Student | null {
    return this.students.find(s => s.userId === userId) || null;
  }

  getStudentByRegNumber(regNumber: string): Student | null {
    return this.students.find(s => s.registrationNumber === regNumber) || null;
  }

  getStudentById(studentId: string): Student | null {
    return this.students.find(s => s.id === studentId) || null;
  }

  getAllStudents(): Student[] {
    return this.students;
  }

  updateStudent(studentId: string, updates: Partial<Student>): Student | null {
    const index = this.students.findIndex(s => s.id === studentId);
    if (index !== -1) {
      this.students[index] = { ...this.students[index], ...updates };
      this.saveData();
      return this.students[index];
    }
    return null;
  }

  getMarksByStudentId(studentId: string): SemesterMarks[] {
    return this.marks.filter(m => m.studentId === studentId);
  }

  updateMarks(studentId: string, semesterNumber: number, cae1: number, cae2: number, endSem: number): SemesterMarks | null {
    const index = this.marks.findIndex(m => m.studentId === studentId && m.semesterNumber === semesterNumber);

    const total = cae1 + cae2 + endSem;
    const gpa = parseFloat(((total / 200) * 10).toFixed(2));

    if (index !== -1) {
      this.marks[index] = {
        ...this.marks[index],
        cae1Marks: cae1,
        cae2Marks: cae2,
        endSemMarks: endSem,
        totalMarks: total,
        gpa: gpa
      };
    } else {
      this.marks.push({
        id: `mark-${Date.now()}`,
        studentId,
        semesterNumber,
        cae1Marks: cae1,
        cae2Marks: cae2,
        endSemMarks: endSem,
        totalMarks: total,
        gpa: gpa,
        semesterRank: 0
      });
    }

    this.calculateCGPAAndRanks();
    return this.marks.find(m => m.studentId === studentId && m.semesterNumber === semesterNumber) || null;
  }

  bulkUpdateMarks(updates: Array<{ regNumber: string; semester: number; cae1: number; cae2: number; endSem: number }>) {
    updates.forEach(update => {
      const student = this.getStudentByRegNumber(update.regNumber);
      if (student) {
        this.updateMarks(student.id, update.semester, update.cae1, update.cae2, update.endSem);
      }
    });
  }

  getAchievementsByStudentId(studentId: string): Achievement[] {
    return this.achievements.filter(a => a.studentId === studentId);
  }

  addAchievement(achievement: Omit<Achievement, 'id'>): Achievement {
    const newAchievement: Achievement = {
      ...achievement,
      id: `achievement-${Date.now()}`
    };
    this.achievements.push(newAchievement);
    this.saveData();
    return newAchievement;
  }

  updateAchievement(id: string, updates: Partial<Achievement>): Achievement | null {
    const index = this.achievements.findIndex(a => a.id === id);
    if (index !== -1) {
      this.achievements[index] = { ...this.achievements[index], ...updates };
      this.saveData();
      return this.achievements[index];
    }
    return null;
  }

  deleteAchievement(id: string): boolean {
    const index = this.achievements.findIndex(a => a.id === id);
    if (index !== -1) {
      this.achievements.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }

  getCoordinatorByUserId(userId: string): Coordinator | null {
    return this.coordinators.find(c => c.userId === userId) || null;
  }

  getStudentIdForParent(parentUserId: string): string | null {
    const mapping = this.parentMappings.find(m => m.parentUserId === parentUserId);
    return mapping ? mapping.studentId : null;
  }

  getAllLoginCredentials(): Array<{ regNumber: string; password: string; role: string }> {
    const credentials = [];

    for (let i = 1; i <= 60; i++) {
      const regNumber = `43110${String(i).padStart(2, '0')}`;
      credentials.push({
        regNumber,
        password: `student${i}@123`,
        role: 'Student'
      });
      credentials.push({
        regNumber,
        password: `parent${i}@123`,
        role: 'Parent'
      });
    }

    credentials.push({
      regNumber: 'coordinator@college.edu',
      password: 'coord@123',
      role: 'Coordinator'
    });

    return credentials;
  }
}

export const dataService = new DataService();
