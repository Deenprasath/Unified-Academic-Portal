import React, { useState } from 'react';
import { Card } from '../Card';
import { ArrowLeft, Upload, FileSpreadsheet, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { dataService } from '../../services/dataService';
import * as XLSX from 'xlsx';

interface BulkUploadProps {
  onBack: () => void;
  onUploadComplete: () => void;
}

export function BulkUpload({ onBack, onUploadComplete }: BulkUploadProps) {
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; details?: string[] } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const downloadTemplate = () => {
    const students = dataService.getAllStudents();
    const templateData = students.map(student => ({
      'Registration Number': student.registrationNumber,
      'Name': student.name,
      'CAE 1': 0,
      'CAE 2': 0,
      'End Semester': 0
    }));

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Semester ${selectedSemester}`);

    const colWidths = [
      { wch: 20 },
      { wch: 30 },
      { wch: 10 },
      { wch: 10 },
      { wch: 15 }
    ];
    ws['!cols'] = colWidths;

    XLSX.writeFile(wb, `Semester_${selectedSemester}_Marks_Template.xlsx`);
  };

  const handleUpload = async () => {
    if (!file) {
      setResult({ success: false, message: 'Please select a file' });
      return;
    }

    setUploading(true);
    setResult(null);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const updates: Array<{ regNumber: string; semester: number; cae1: number; cae2: number; endSem: number }> = [];
      const errors: string[] = [];

      jsonData.forEach((row: any, index) => {
        const regNumber = String(row['Registration Number']).trim();
        const cae1 = Number(row['CAE 1']);
        const cae2 = Number(row['CAE 2']);
        const endSem = Number(row['End Semester']);

        if (!regNumber) {
          errors.push(`Row ${index + 2}: Missing registration number`);
          return;
        }

        if (isNaN(cae1) || cae1 < 0 || cae1 > 50) {
          errors.push(`Row ${index + 2}: Invalid CAE 1 marks for ${regNumber} (must be 0-50)`);
          return;
        }

        if (isNaN(cae2) || cae2 < 0 || cae2 > 50) {
          errors.push(`Row ${index + 2}: Invalid CAE 2 marks for ${regNumber} (must be 0-50)`);
          return;
        }

        if (isNaN(endSem) || endSem < 0 || endSem > 100) {
          errors.push(`Row ${index + 2}: Invalid End Semester marks for ${regNumber} (must be 0-100)`);
          return;
        }

        const student = dataService.getStudentByRegNumber(regNumber);
        if (!student) {
          errors.push(`Row ${index + 2}: Student not found with registration number ${regNumber}`);
          return;
        }

        updates.push({
          regNumber,
          semester: selectedSemester,
          cae1,
          cae2,
          endSem
        });
      });

      if (errors.length > 0) {
        setResult({
          success: false,
          message: `Found ${errors.length} error(s) in the file`,
          details: errors
        });
        setUploading(false);
        return;
      }

      dataService.bulkUpdateMarks(updates);

      setResult({
        success: true,
        message: `Successfully uploaded marks for ${updates.length} students in Semester ${selectedSemester}`,
        details: [`CGPA and ranks have been automatically recalculated for all students`]
      });

      setFile(null);
      setTimeout(() => {
        onUploadComplete();
      }, 2000);

    } catch (error) {
      setResult({
        success: false,
        message: 'Error processing file. Please check the format and try again.',
        details: [error instanceof Error ? error.message : 'Unknown error']
      });
    }

    setUploading(false);
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-violet-600 hover:text-violet-800 font-medium"
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </button>

      <Card title="Bulk Upload Marks">
        <div className="space-y-6">
          <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
            <h4 className="font-semibold text-violet-900 mb-2">Instructions:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-violet-700">
              <li>Select the semester for which you want to upload marks</li>
              <li>Download the Excel template with all student details</li>
              <li>Fill in the marks (CAE 1: 0-50, CAE 2: 0-50, End Semester: 0-100)</li>
              <li>Upload the completed Excel file</li>
              <li>CGPA and ranks will be calculated automatically</li>
            </ol>
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

          <div>
            <button
              onClick={downloadTemplate}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download size={20} />
              Download Excel Template for Semester {selectedSemester}
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Template includes all {dataService.getAllStudents().length} students with their registration numbers
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Upload Completed Excel File
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 flex items-center justify-center gap-3 px-6 py-4 border-2 border-dashed border-violet-300 rounded-lg hover:border-violet-500 cursor-pointer transition-colors">
                <FileSpreadsheet className="text-violet-600" size={24} />
                <span className="text-gray-700">
                  {file ? file.name : 'Click to select Excel file'}
                </span>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {file && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-700 text-white rounded-lg hover:from-violet-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload size={20} />
              {uploading ? 'Uploading...' : 'Upload Marks'}
            </button>
          )}

          {result && (
            <div className={`p-4 rounded-lg border ${
              result.success
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-start gap-3">
                {result.success ? (
                  <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                ) : (
                  <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
                )}
                <div className="flex-1">
                  <p className={`font-semibold ${
                    result.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.message}
                  </p>
                  {result.details && result.details.length > 0 && (
                    <ul className={`mt-2 space-y-1 text-sm ${
                      result.success ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {result.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
