import React, { useState } from 'react';
import { Achievement } from '../../types';
import { Plus, Trash2, Calendar, Award } from 'lucide-react';

interface AchievementsProps {
  studentId: string;
  achievements: Achievement[];
  onAdd: (achievement: Omit<Achievement, 'id'>) => void;
  onDelete: (id: string) => void;
}

export function Achievements({ studentId, achievements, onAdd, onDelete }: AchievementsProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    type: 'internship' as Achievement['type'],
    title: '',
    description: '',
    achievementDate: '',
    certificateUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      studentId
    });
    setFormData({
      type: 'internship',
      title: '',
      description: '',
      achievementDate: '',
      certificateUrl: ''
    });
    setIsAdding(false);
  };

  const achievementTypes = [
    { value: 'internship', label: 'Internship', icon: '💼' },
    { value: 'hackathon', label: 'Hackathon', icon: '🏆' },
    { value: 'certification', label: 'Certification', icon: '📜' },
    { value: 'extracurricular', label: 'Extra-curricular', icon: '🎯' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Achievements & Activities</h3>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          <Plus size={16} />
          Add Achievement
        </button>
      </div>

      {isAdding && (
        <div className="bg-violet-50 p-6 rounded-lg border border-violet-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Achievement['type'] })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                required
              >
                {achievementTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="e.g., Software Development Intern at Google"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Brief description of your achievement..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={formData.achievementDate}
                onChange={(e) => setFormData({ ...formData, achievementDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Certificate URL (optional)</label>
              <input
                type="url"
                value={formData.certificateUrl}
                onChange={(e) => setFormData({ ...formData, certificateUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="https://..."
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              >
                Add Achievement
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {achievements.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Award className="mx-auto text-gray-400 mb-3" size={48} />
          <p className="text-gray-600">No achievements added yet</p>
          <p className="text-sm text-gray-500 mt-1">Click "Add Achievement" to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {achievements.map((achievement) => {
            const typeInfo = achievementTypes.find(t => t.value === achievement.type);
            return (
              <div
                key={achievement.id}
                className="bg-white border border-violet-100 rounded-lg p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{typeInfo?.icon}</span>
                      <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-medium">
                        {typeInfo?.label}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {achievement.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">
                      {achievement.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{achievement.achievementDate}</span>
                      </div>
                      {achievement.certificateUrl && (
                        <a
                          href={achievement.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-600 hover:text-violet-700 underline"
                        >
                          View Certificate
                        </a>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onDelete(achievement.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
