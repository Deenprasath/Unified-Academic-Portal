# Login Credentials

## Student Logins
Students can log in using their Registration Number and Password.

### Sample Student Credentials:
| Registration Number | Password | Student Name |
|-------------------|----------|--------------|
| 4311001 | student1@123 | Aarav Sharma |
| 4311002 | student2@123 | Aditi Patel |
| 4311003 | student3@123 | Arjun Kumar |
| 4311004 | student4@123 | Ananya Singh |
| 4311005 | student5@123 | Aditya Reddy |
| ... | ... | ... |
| 4311060 | student60@123 | Advay Ganguly |

**Pattern:** All 60 students (4311001 to 4311060) follow the pattern `student{N}@123` where N is 1-60

## Parent Logins
Parents use the SAME registration number as their child but with a different password.

### Sample Parent Credentials:
| Registration Number | Password | Child |
|-------------------|----------|-------|
| 4311001 | parent1@123 | Aarav Sharma |
| 4311002 | parent2@123 | Aditi Patel |
| 4311003 | parent3@123 | Arjun Kumar |
| 4311004 | parent4@123 | Ananya Singh |
| 4311005 | parent5@123 | Aditya Reddy |
| ... | ... | ... |
| 4311060 | parent60@123 | Advay Ganguly |

**Pattern:** All 60 parents follow the pattern `parent{N}@123` where N is 1-60

## Coordinator Login

### Coordinator Credentials:
| Email | Password | Name | Department | Section |
|-------|----------|------|------------|---------|
| coordinator@college.edu | coord@123 | Dr. Rajesh Kumar | Computer Science Engineering | Section A |

---

## Quick Test Accounts

### For Testing Student Portal:
- **Username:** 4311001
- **Password:** student1@123

### For Testing Parent Portal:
- **Username:** 4311001
- **Password:** parent1@123

### For Testing Coordinator Portal:
- **Username:** coordinator@college.edu
- **Password:** coord@123

---

## Important Notes

1. All students (4311001-4311060) have pre-populated data including:
   - Personal information (name, DOB, blood group, phone, address)
   - Academic marks for all 8 semesters
   - Calculated GPA, CGPA, and ranks
   - Attendance percentage
   - Placement status

2. Parents have view-only access to their child's information

3. Coordinator has full access to:
   - View all 60 students
   - Edit any student's personal information
   - Upload marks in bulk via Excel
   - View all achievements

4. Data is stored in browser's localStorage and persists across sessions

5. The application automatically calculates:
   - Semester GPA = (CAE1 + CAE2 + EndSem) / 200 * 10
   - CGPA = Average of all semester GPAs
   - Ranks based on CGPA (overall) and GPA (per semester)
