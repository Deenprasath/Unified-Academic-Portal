# Quick Setup Guide

## Prerequisites
- Node.js 18 or higher
- npm (comes with Node.js)
- Modern web browser

## Installation Steps

### Step 1: Install Node.js
If you don't have Node.js installed:
1. Visit https://nodejs.org/
2. Download LTS version
3. Install and verify with: `node --version`

### Step 2: Navigate to Project
```bash
cd /path/to/project
```

### Step 3: Install Dependencies
```bash
npm install
```
This will install all required packages (~65 packages).

### Step 4: Start Development Server
```bash
npm run dev
```

The application will start at: **http://localhost:5173**

### Step 5: Login and Test

**Test as Student:**
- Username: `4311001`
- Password: `student1@123`

**Test as Parent:**
- Username: `4311001`
- Password: `parent1@123`

**Test as Coordinator:**
- Username: `coordinator@college.edu`
- Password: `coord@123`

## Available Commands

### Development
```bash
npm run dev        # Start dev server (http://localhost:5173)
```

### Production Build
```bash
npm run build      # Build for production (output: dist/)
npm run preview    # Preview production build
```

### Code Quality
```bash
npm run lint       # Check code quality
npm run typecheck  # Verify TypeScript types
```

## Project Files Overview

### Core Application Files
- `src/App.tsx` - Main application component
- `src/main.tsx` - Application entry point
- `src/index.css` - Global styles

### Component Files
- `src/components/Login.tsx` - Login page
- `src/components/StudentPortal.tsx` - Student dashboard
- `src/components/ParentPortal.tsx` - Parent dashboard
- `src/components/CoordinatorPortal.tsx` - Coordinator dashboard

### Service Files
- `src/services/authService.ts` - Authentication logic
- `src/services/dataService.ts` - Data management
- `src/services/mockData.ts` - 60 students sample data

### Type Definitions
- `src/types/index.ts` - TypeScript interfaces

### Documentation
- `README.md` - Complete documentation
- `CREDENTIALS.md` - All login credentials
- `STUDENT_LIST.md` - Complete student list
- `SETUP_GUIDE.md` - This file

## Troubleshooting

### Port Already in Use
If port 5173 is busy:
```bash
npm run dev -- --port 3000
```

### Module Not Found Errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Clear Browser Data
If login issues occur:
1. Open DevTools (F12)
2. Application → Storage → Clear site data
3. Refresh page

### Build Warnings
The build warnings about chunk size are normal and don't affect functionality.

## VS Code Setup (Recommended)

### Recommended Extensions
1. ESLint
2. Prettier
3. Tailwind CSS IntelliSense
4. TypeScript and JavaScript Language Features

### Open in VS Code
```bash
code .
```

## File Structure
```
project/
├── src/                      # Source code
│   ├── components/          # React components
│   │   ├── coordinator/    # Coordinator-specific
│   │   ├── student/        # Student-specific
│   │   ├── Card.tsx
│   │   ├── Layout.tsx
│   │   └── Login.tsx
│   ├── services/           # Business logic
│   ├── types/              # TypeScript types
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── public/                  # Static assets
├── dist/                    # Production build (after npm run build)
├── README.md               # Full documentation
├── CREDENTIALS.md          # Login details
├── STUDENT_LIST.md         # All students
├── SETUP_GUIDE.md          # This file
├── package.json            # Dependencies
└── vite.config.ts          # Build configuration
```

## Technologies Used

### Frontend Framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool

### Styling
- **Tailwind CSS** - Utility-first CSS
- **Lavender/Violet Theme** - Professional color scheme

### Data & Logic
- **LocalStorage** - Data persistence
- **xlsx** - Excel file handling
- **Lucide React** - Icons

## Testing the Application

### 1. Test Student Portal
- Login as student (4311001 / student1@123)
- Edit personal information
- View marks for different semesters
- Add achievements
- Update placement status

### 2. Test Parent Portal
- Logout from student
- Login as parent (4311001 / parent1@123)
- Verify view-only access
- Check marks display correctly
- Confirm attendance shown

### 3. Test Coordinator Portal
- Login as coordinator
- View student list (all 60 students)
- Search for specific student
- Click student to view details
- Test Excel upload:
  1. Click "Upload Marks"
  2. Select semester
  3. Download template
  4. Add sample marks
  5. Upload file
  6. Verify success

## Data Information

### Pre-populated Data
- **60 Students** (4311001-4311060)
- **8 Semesters** of marks per student
- **Personal details** for each student
- **Attendance** percentages (75-95%)
- **Placement** status for all
- **GPA/CGPA** automatically calculated
- **Rankings** automatically computed

### Data Persistence
- Stored in browser localStorage
- Persists across sessions
- Survives page refresh
- Cleared only when:
  - Browser data cleared
  - localStorage manually cleared
  - Different browser used

## Deployment Options

### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy (automatic)

### Option 2: Netlify
1. Run `npm run build`
2. Drag `dist` folder to Netlify
3. Site live immediately

### Option 3: Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Option 4: GitHub Pages
1. Update `vite.config.ts` with base path
2. Build: `npm run build`
3. Deploy `dist/` to gh-pages branch

## Support & Help

### Common Questions

**Q: Where is the database?**
A: Data is stored in browser's localStorage. No external database needed.

**Q: Can I add more students?**
A: Yes, modify `src/services/mockData.ts` to generate more students.

**Q: How do I change passwords?**
A: Edit the password patterns in `src/services/mockData.ts`.

**Q: Can I add more semesters?**
A: Yes, update the semester loop in data generation (currently 1-8).

**Q: Excel upload not working?**
A: Ensure column names match exactly and mark values are within limits.

### Getting Help

1. Check README.md for detailed documentation
2. Review CREDENTIALS.md for login issues
3. Check browser console (F12) for errors
4. Clear localStorage and retry
5. Verify Node.js version (18+)

## Next Steps

After setup:
1. ✅ Test all three portals
2. ✅ Try Excel upload feature
3. ✅ Add sample achievements as student
4. ✅ Edit student information as coordinator
5. ✅ View data as parent

## Production Checklist

Before deploying to production:
- [ ] Update passwords to secure values
- [ ] Implement proper authentication
- [ ] Add real database (Firebase/Supabase)
- [ ] Enable HTTPS
- [ ] Add session management
- [ ] Implement proper logging
- [ ] Add error tracking
- [ ] Set up backups
- [ ] Add rate limiting
- [ ] Implement proper RBAC

---

**Need help?** Check the full README.md for comprehensive documentation.

**Ready to start?** Run `npm run dev` and open http://localhost:5173
