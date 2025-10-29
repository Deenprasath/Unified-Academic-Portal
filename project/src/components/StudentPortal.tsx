import { useState, useEffect } from 'react';
import { Layout } from './Layout';
import { Card } from './Card';
import { User, BookOpen, Award, TrendingUp } from 'lucide-react';
import { dataService } from '../services/dataService';
import { authService } from '../services/authService';
import { Student, SemesterMarks, Achievement } from '../types';
import { PersonalInfo } from './student/PersonalInfo';
import { AcademicDetails } from './student/AcademicDetails';
import { Achievements } from './student/Achievements';

interface StudentPortalProps {
  onLogout: () => void;
}

export function StudentPortal({ onLogout }: StudentPortalProps) {
  const [activeTab, setActiveTab] = useState<'personal' | 'academic' | 'placement' | 'achievements'>('personal');
  const [student, setStudent] = useState<Student | null>(null);
  const [marks, setMarks] = useState<SemesterMarks[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = () => {
    const user = authService.getCurrentUser();
    if (user) {
      const studentData = dataService.getStudentByUserId(user.id);
      if (studentData) {
        setStudent(studentData);
        setMarks(dataService.getMarksByStudentId(studentData.id));
        setAchievements(dataService.getAchievementsByStudentId(studentData.id));
      }
    }
  };

  const handleUpdateStudent = (updates: Partial<Student>) => {
    if (student) {
      const updated = dataService.updateStudent(student.id, updates);
      if (updated) {
        setStudent(updated);
      }
    }
  };

  const handleAddAchievement = (achievement: Omit<Achievement, 'id'>) => {
    const newAchievement = dataService.addAchievement(achievement);
    setAchievements([...achievements, newAchievement]);
  };

  const handleDeleteAchievement = (id: string) => {
    dataService.deleteAchievement(id);
    setAchievements(achievements.filter(a => a.id !== id));
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  const tabs = [
    { id: 'personal' as const, label: 'Personal Information', icon: User },
    { id: 'academic' as const, label: 'Academic Details', icon: BookOpen },
    { id: 'placement' as const, label: 'Placement', icon: TrendingUp },
    { id: 'achievements' as const, label: 'Achievements', icon: Award }
  ];

  return (
    <Layout title="Student Dashboard" onLogout={onLogout}>
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
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'personal' && (
              <PersonalInfo student={student} onUpdate={handleUpdateStudent} />
            )}
            {activeTab === 'academic' && (
              <AcademicDetails student={student} marks={marks} />
            )}
            {activeTab === 'placement' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Placement Status</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={student.placementStatus}
                    onChange={(e) => handleUpdateStudent({ placementStatus: e.target.value as 'PLACED' | 'NOT PLACED' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  >
                    <option value="NOT PLACED">Not Placed</option>
                    <option value="PLACED">Placed</option>
                  </select>
                </div>
                <div className={`p-4 rounded-lg ${student.placementStatus === 'PLACED' ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                  <p className={`text-sm ${student.placementStatus === 'PLACED' ? 'text-green-700' : 'text-yellow-700'}`}>
                    {student.placementStatus === 'PLACED'
                      ? '🎉 Congratulations! You are placed.'
                      : '📝 Keep preparing for upcoming placement opportunities.'}
                  </p>
                </div>
              </div>
            )}
            {activeTab === 'achievements' && (
              <Achievements
                studentId={student.id}
                achievements={achievements}
                onAdd={handleAddAchievement}
                onDelete={handleDeleteAchievement}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
