# Unified Academic Management Portal

A comprehensive role-based web application for managing academic data, designed for Students, Parents, and Coordinators.

## Overview

The Unified Academic Management Portal modernizes academic data management by providing a secure, centralized digital system that:
- Replaces manual processes with automated workflows
- Strengthens communication between students, coordinators, and parents
- Provides real-time access to academic performance and attendance
- Supports bulk operations for efficient administration

## Features

### For Students
- **Personal Profile Management**
  - View and edit personal information (name, phone, address, blood group)
  - Upload profile photo
  - Update placement status

- **Academic Performance**
  - View marks for all 8 semesters (CAE 1, CAE 2, End Semester)
  - Automatic GPA calculation for each semester
  - Overall CGPA tracking
  - Class rank based on CGPA
  - Attendance percentage monitoring

- **Achievements Tracking**
  - Add internships, hackathons, certifications, and extracurricular activities
  - Attach certificates and proof documents
  - Maintain comprehensive achievement portfolio

### For Parents
- **View-Only Access** to their child's:
  - Complete personal information
  - All academic marks and GPA/CGPA
  - Attendance records
  - Overall class rank
  - Placement status

### For Coordinators
- **Student Management**
  - View all 60 students in the class
  - Search and filter students
  - Access complete student profiles
  - Edit any student information

- **Bulk Operations**
  - Upload marks for entire class via Excel
  - Download pre-filled Excel templates
  - Automatic GPA/CGPA calculation
  - Automatic rank updates

- **Administrative Tools**
  - Monitor class performance
  - Track attendance trends
  - View placement statistics

## Technology Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with lavender/violet theme
- **Vite** - Fast build tool and dev server

### Data Management
- **LocalStorage** - Browser-based data persistence
- **xlsx** - Excel file parsing and generation
- **Lucide React** - Beautiful icons

### Development Tools
- **ESLint** - Code quality
- **TypeScript ESLint** - Type checking
- **PostCSS** - CSS processing

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm installed
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation Steps

1. **Clone or extract the project**
   ```bash
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will open at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```
   Production files will be in the `dist/` folder

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Project Structure

```
project/
├── src/
│   ├── components/
│   │   ├── coordinator/          # Coordinator portal components
│   │   │   ├── BulkUpload.tsx
│   │   │   ├── StudentDetails.tsx
│   │   │   └── StudentList.tsx
│   │   ├── student/              # Student portal components
│   │   │   ├── AcademicDetails.tsx
│   │   │   ├── Achievements.tsx
│   │   │   └── PersonalInfo.tsx
│   │   ├── Card.tsx              # Reusable card component
│   │   ├── CoordinatorPortal.tsx # Main coordinator interface
│   │   ├── Layout.tsx            # Common layout wrapper
│   │   ├── Login.tsx             # Login page
│   │   ├── ParentPortal.tsx      # Parent interface
│   │   └── StudentPortal.tsx     # Student interface
│   ├── services/
│   │   ├── authService.ts        # Authentication logic
│   │   ├── dataService.ts        # Data management
│   │   └── mockData.ts           # 60 students sample data
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   ├── App.tsx                   # Main app component
│   ├── index.css                 # Global styles
│   └── main.tsx                  # App entry point
├── CREDENTIALS.md                # Complete login credentials
├── README.md                     # This file
└── package.json                  # Dependencies
```

## Usage Guide

### Login Instructions

1. **Open the application** in your browser
2. **Select user type:**
   - Students: Use registration number (4311001-4311060)
   - Parents: Use same registration number as their child
   - Coordinator: Use email (coordinator@college.edu)
3. **Enter password** (see CREDENTIALS.md)
4. **Click Login**

See `CREDENTIALS.md` for complete list of login credentials.

### Student Portal Usage

1. **Personal Information Tab**
   - Click "Edit" to update your details
   - Change name, phone, address, blood group
   - Click "Save" when done

2. **Academic Details Tab**
   - Select semester (1-8) to view marks
   - View CAE 1, CAE 2, End Semester marks
   - Check your GPA and semester rank
   - Overall CGPA and rank displayed at top

3. **Placement Tab**
   - Update status: "PLACED" or "NOT PLACED"

4. **Achievements Tab**
   - Click "Add Achievement"
   - Choose type (Internship, Hackathon, Certification, Extracurricular)
   - Fill in details and dates
   - Optionally add certificate URL

### Parent Portal Usage

1. Login with your child's registration number and parent password
2. View all information in read-only mode
3. Navigate between Personal Information and Academic Details tabs
4. Monitor attendance and performance regularly

### Coordinator Portal Usage

1. **View Students List**
   - See all 60 students with key metrics
   - Search by name or registration number
   - Click "View Details" to see full profile

2. **Upload Marks (Excel)**
   - Click "Upload Marks (Excel)" button
   - Select semester (1-8)
   - Download Excel template with all student names
   - Fill in marks (CAE 1: 0-50, CAE 2: 0-50, End Sem: 0-100)
   - Upload completed file
   - System automatically calculates GPA, CGPA, and ranks

3. **Edit Student Details**
   - Select any student from the list
   - Edit personal information
   - View/edit achievements
   - Changes saved automatically

## GPA/CGPA Calculation

### Semester GPA
```
Total Marks = CAE 1 + CAE 2 + End Semester (max 200)
GPA = (Total Marks / 200) × 10
```

Example:
- CAE 1: 45/50
- CAE 2: 48/50
- End Sem: 85/100
- Total: 178/200
- GPA: (178/200) × 10 = 8.90

### CGPA (Cumulative GPA)
```
CGPA = Average of all semester GPAs
```

Example for 4 completed semesters:
- Sem 1 GPA: 8.5
- Sem 2 GPA: 9.0
- Sem 3 GPA: 8.7
- Sem 4 GPA: 9.2
- CGPA: (8.5 + 9.0 + 8.7 + 9.2) / 4 = 8.85

### Ranking
- **Semester Rank:** Based on semester GPA (highest = Rank 1)
- **Overall Rank:** Based on CGPA (highest = Rank 1)
- Automatically recalculated after marks upload

## Data Management

### Data Storage
- All data stored in browser's localStorage
- Persists across browser sessions
- No external database required for demo
- Can be cleared via browser settings

### Data Structure
- 60 pre-populated students (4311001-4311060)
- 8 semesters of marks per student (480 mark records)
- Personal info, attendance, placement status
- User accounts (60 students + 60 parents + 1 coordinator)

### Resetting Data
To reset to initial state:
1. Open browser Developer Tools (F12)
2. Go to Application/Storage tab
3. Clear localStorage
4. Refresh page

## Excel Upload Format

### Required Columns
| Registration Number | Name | CAE 1 | CAE 2 | End Semester |
|-------------------|------|-------|-------|--------------|
| 4311001 | Aarav Sharma | 45 | 48 | 85 |
| 4311002 | Aditi Patel | 43 | 46 | 88 |

### Rules
- CAE 1: 0-50 marks
- CAE 2: 0-50 marks
- End Semester: 0-100 marks
- Registration numbers must match exactly
- All fields required
- Download template from coordinator portal

## Design Theme

The application uses a professional lavender/violet color scheme:
- **Primary:** Violet 600 (#7C3AED)
- **Secondary:** Purple 700 (#7E22CE)
- **Background:** Violet 50, Lavender 100
- **Accents:** Green (success), Red (errors), Blue (info)

All pages maintain consistent:
- Color palette
- Typography
- Spacing
- Component styling

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Initial load: ~620KB minified JS
- Instant navigation (no page reloads)
- Fast search and filtering
- Efficient data calculations
- Responsive on all screen sizes

## Security Considerations

### Current Implementation (Demo)
- Password stored in plain text (localStorage)
- No encryption
- No session timeout
- Suitable for demonstration/learning

### Production Recommendations
- Implement proper authentication (JWT, OAuth)
- Use HTTPS only
- Hash passwords with bcrypt
- Add session management
- Implement rate limiting
- Use proper database (Firebase, Supabase, PostgreSQL)
- Add audit logging
- Implement RBAC properly

## Troubleshooting

### Login Issues
- Verify credentials in CREDENTIALS.md
- Check for typos in registration number/email
- Clear browser cache and try again

### Data Not Saving
- Check browser localStorage is enabled
- Try different browser
- Clear localStorage and refresh

### Excel Upload Errors
- Verify column names match exactly
- Check mark values are within limits
- Ensure registration numbers are correct
- Download fresh template

## Future Enhancements

- Email notifications
- SMS alerts for attendance
- Parent-teacher messaging
- Report card generation (PDF)
- Analytics dashboard
- Mobile app version
- Multi-section support
- Subject-wise marks breakdown
- Graphical performance trends

## Support

For issues or questions:
1. Check CREDENTIALS.md for login help
2. Review this README for usage instructions
3. Clear browser data and retry
4. Check browser console for errors (F12)

## License

This is an educational project for academic management demonstration.

---

**Developed for:** Academic Management
**Version:** 1.0.0
**Last Updated:** October 2025
