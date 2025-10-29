import { useState } from 'react';
import { Student, SemesterMarks } from '../../types';
import { Award, TrendingUp } from 'lucide-react';

interface AcademicDetailsProps {
  student: Student;
  marks: SemesterMarks[];
}

export function AcademicDetails({ student, marks }: AcademicDetailsProps) {
  const [selectedSemester, setSelectedSemester] = useState(1);

  const semesterMarks = marks.find(m => m.semesterNumber === selectedSemester);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-lg border border-violet-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-violet-600 rounded-lg">
              <Award className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">CGPA</p>
              <p className="text-2xl font-bold text-violet-700">{student.cgpa.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-600 rounded-lg">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Overall Rank</p>
              <p className="text-2xl font-bold text-green-700">#{student.overallRank}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <svg className="text-white w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Attendance</p>
              <p className="text-2xl font-bold text-blue-700">{student.attendancePercentage}%</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Select Semester</label>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <button
              key={sem}
              onClick={() => setSelectedSemester(sem)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedSemester === sem
                  ? 'bg-violet-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-violet-50'
              }`}
            >
              Sem {sem}
            </button>
          ))}
        </div>
      </div>

      {semesterMarks ? (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Semester {selectedSemester} Marks</h4>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-violet-50 to-purple-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Assessment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Marks Obtained</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Maximum Marks</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CAE 1</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{semesterMarks.cae1Marks}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">50</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CAE 2</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{semesterMarks.cae2Marks}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">50</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">End Semester</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{semesterMarks.endSemMarks}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">100</td>
                </tr>
                <tr className="bg-violet-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">Total</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-violet-700">{semesterMarks.totalMarks}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">200</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
              <p className="text-sm text-gray-600 mb-1">Semester GPA</p>
              <p className="text-3xl font-bold text-violet-700">{semesterMarks.gpa.toFixed(2)}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Semester Rank</p>
              <p className="text-3xl font-bold text-purple-700">#{semesterMarks.semesterRank}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No marks available for Semester {selectedSemester}</p>
        </div>
      )}
    </div>
  );
}
