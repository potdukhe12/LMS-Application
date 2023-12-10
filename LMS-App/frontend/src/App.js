import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

// import Homepage from './pages/Homepage';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';

import ChooseUser from "./pages/ChooseUser";
import LoginPage from "./pages/LoginPage";
import AdminRegisterPage from './pages/admin/AdminRegisterPage';

function App() {

  const { currentRole } = useSelector(state => state.user);
  
  return (
    <Router>
      {/* Home */}
      {currentRole === null &&
        <Routes>
          {/* <Route path="/" element={<Homepage />} />  */}
          
          <Route path="/" element={<ChooseUser />} /> 
          <Route path="/choose" element={<ChooseUser />} />

          <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
          <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
          <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />

          <Route path="/Adminregister" element={<AdminRegisterPage />} />

          <Route path='*' element={<Navigate to="/choose" />} />
        </Routes>
      }

      {/* Admin */}
      {currentRole === "Admin" &&
        <AdminDashboard />
      }

      {/* Student */}
      {currentRole === "Student" &&
        <>
          <StudentDashboard />
        </>
      }

      {/* Teacher */}
      {currentRole === "Teacher" &&
        <>
          <TeacherDashboard />
        </>
      }
      
    </Router>
  );
}

export default App;
