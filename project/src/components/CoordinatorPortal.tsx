import { useState, useEffect } from 'react';
import { Layout } from './Layout';
import { Card } from './Card';
import { Upload, User } from 'lucide-react';
import { dataService } from '../services/dataService';
import { authService } from '../services/authService';
import { Coordinator, Student } from '../types';
import { StudentList } from './coordinator/StudentList';
import { StudentDetails } from './coordinator/StudentDetails';
import { BulkUpload } from './coordinator/BulkUpload';

interface CoordinatorPortalProps {
  onLogout: () => void;
}

export function CoordinatorPortal({ onLogout }: CoordinatorPortalProps) {
  const [activeView, setActiveView] = useState<'list' | 'details' | 'upload'>('list');
  const [coordinator, setCoordinator] = useState<Coordinator | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const user = authService.getCurrentUser();
    if (user) {
      const coordData = dataService.getCoordinatorByUserId(user.id);
      if (coordData) {
        setCoordinator(coordData);
      }
      setStudents(dataService.getAllStudents());
    }
  };

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setActiveView('details');
  };

  const handleBackToList = () => {
    setActiveView('list');
    setSelectedStudent(null);
    loadData();
  };

  const handleUploadComplete = () => {
    loadData();
    setActiveView('list');
  };

  if (!coordinator) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title="Coordinator Dashboard" onLogout={onLogout}>
      <div className="space-y-6">
        <Card>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-purple-700 rounded-full flex items-center justify-center">
              <User className="text-white" size={36} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{coordinator.name}</h2>
              <p className="text-violet-600 font-medium">{coordinator.email}</p>
              <p className="text-gray-600">{coordinator.department} - {coordinator.section}</p>
            </div>
          </div>
        </Card>

        {activeView === 'list' && (
          <div className="space-y-6">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveView('upload')}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-700 text-white rounded-lg hover:from-violet-700 hover:to-purple-800 transition-all shadow-lg"
              >
                <Upload size={20} />
                Upload Marks (Excel)
              </button>
            </div>

            <Card title={`Students List (${students.length} students)`}>
              <StudentList students={students} onSelectStudent={handleSelectStudent} />
            </Card>
          </div>
        )}

        {activeView === 'details' && selectedStudent && (
          <StudentDetails
            student={selectedStudent}
            onBack={handleBackToList}
            onUpdate={loadData}
          />
        )}

        {activeView === 'upload' && (
          <BulkUpload
            onBack={handleBackToList}
            onUploadComplete={handleUploadComplete}
          />
        )}
      </div>
    </Layout>
  );
}
