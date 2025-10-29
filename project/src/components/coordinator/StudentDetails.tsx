import { useState, useEffect } from 'react';
import { Student, SemesterMarks, Achievement } from '../../types';
import { dataService } from '../../services/dataService';
import { Card } from '../Card';
import { ArrowLeft } from 'lucide-react';
import { PersonalInfo } from '../student/PersonalInfo';
import { AcademicDetails } from '../student/AcademicDetails';
import { Achievements } from '../student/Achievements';

interface StudentDetailsProps {
  student: Student;
  onBack: () => void;
  onUpdate: () => void;
}

export function StudentDetails({ student: initialStudent, onBack, onUpdate }: StudentDetailsProps) {
  const [activeTab, setActiveTab] = useState<'personal' | 'academic' | 'achievements'>('personal');
  const [student, setStudent] = useState(initialStudent);
  const [marks, setMarks] = useState<SemesterMarks[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setMarks(dataService.getMarksByStudentId(student.id));
    setAchievements(dataService.getAchievementsByStudentId(student.id));
  };

  const handleUpdateStudent = (updates: Partial<Student>) => {
    const updated = dataService.updateStudent(student.id, updates);
    if (updated) {
      setStudent(updated);
      onUpdate();
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

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-violet-600 hover:text-violet-800 font-medium"
      >
        <ArrowLeft size={20} />
        Back to Students List
      </button>

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
            {[
              { id: 'personal' as const, label: 'Personal Information' },
              { id: 'academic' as const, label: 'Academic Details' },
              { id: 'achievements' as const, label: 'Achievements' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-violet-600 to-purple-700 text-white'
                    : 'text-gray-600 hover:bg-violet-50'
                }`}
              >
                {tab.label}
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
  );
}
