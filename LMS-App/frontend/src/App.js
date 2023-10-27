import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
// import Homepage from './pages/Homepage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ShowClasses from "./pages/admin/classRelated/ShowClasses";

function App() {
  return (
    <Router>
      {/* Home */}
       <Routes>
        {/* <Route path="/" element={<AdminDashboard />} />  */}
      </Routes>

      {/* Admin */}
      <AdminDashboard />
      
    </Router>
  );
}

export default App;
