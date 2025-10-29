import { useState, useEffect } from 'react';
import { Layout } from './Layout';
import { Card } from './Card';
import { User, BookOpen } from 'lucide-react';
import { dataService } from '../services/dataService';
import { authService } from '../services/authService';
import { Student, SemesterMarks } from '../types';
import { AcademicDetails } from './student/AcademicDetails';

interface ParentPortalProps {
  onLogout: () => void;
}

export function ParentPortal({ onLogout }: ParentPortalProps) {
  const [activeTab, setActiveTab] = useState<'personal' | 'academic'>('personal');
  const [student, setStudent] = useState<Student | null>(null);
  const [marks, setMarks] = useState<SemesterMarks[]>([]);

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = () => {
    const user = authService.getCurrentUser();
    if (user) {
      const studentId = dataService.getStudentIdForParent(user.id);
      if (studentId) {
        const studentData = dataService.getStudentById(studentId);
        if (studentData) {
          setStudent(studentData);
          setMarks(dataService.getMarksByStudentId(studentData.id));
        }
      }
    }
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  const tabs = [
    { id: 'personal' as const, label: 'Personal Information', icon: User },
    { id: 'academic' as const, label: 'Academic Details', icon: BookOpen }
  ];

  return (
    <Layout title="Parent Dashboard" onLogout={onLogout}>
      <div className="space-y-6">
        <Card>
          <div className="flex items-center gap-6">
            <img
              src={student.photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
              alt={student.name}
              className="w-24 h-24 rounded-full border-4 border-violet-200"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
              <p className="text-violet-600 font-medium">{student.registrationNumber}</p>
              <p className="text-gray-600">{student.department} - Section {student.classSection}</p>
              <div className="mt-2 flex gap-4 text-sm">
                <span className="text-gray-600">CGPA: <strong className="text-violet-700">{student.cgpa}</strong></span>
                <span className="text-gray-600">Rank: <strong className="text-violet-700">#{student.overallRank}</strong></span>
                <span className="text-gray-600">Attendance: <strong className="text-violet-700">{student.attendancePercentage}%</strong></span>
              </div>
            </div>
          </div>
        </Card>

        <div className="bg-white rounded-xl shadow-md border border-violet-100 overflow-hidden">
          <div className="border-b border-violet-100">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-violet-600 to-purple-700 text-white'
                      : 'text-gray-600 hover:bg-violet-50'
                  }`}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <p className="text-gray-900 font-medium">{student.name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
                    <p className="text-gray-900 font-medium">{student.registrationNumber}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <p className="text-gray-900 font-medium">{student.dateOfBirth}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                    <p className="text-gray-900 font-medium">{student.bloodGroup}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <p className="text-gray-900 font-medium">{student.phone}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <p className="text-gray-900 font-medium">{student.department}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Class Section</label>
                    <p className="text-gray-900 font-medium">Section {student.classSection}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Placement Status</label>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      student.placementStatus === 'PLACED'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {student.placementStatus}
                    </span>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <p className="text-gray-900 font-medium">{student.address}</p>
                  </div>
                </div>

                <div className="bg-violet-50 p-4 rounded-lg border border-violet-200 mt-6">
                  <p className="text-sm text-violet-700">
                    ℹ️ This information is view-only. Contact the coordinator for any updates.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'academic' && (
              <AcademicDetails student={student} marks={marks} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
