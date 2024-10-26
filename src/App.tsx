import { Route, Routes } from "react-router-dom";
import { Assignment } from "./pages/Assignment";
import { Login } from "./pages/Login";
import "./App.css";
import { AssignmentList } from "./pages/AssignmentList";
import { ClassList } from "./pages/ClassList";
import { Class } from "./pages/Class";
import { Submission } from "./pages/Submission";
import { SubmissionList } from "./pages/SubmissionList";
import { Student } from "./pages/Student";
import { StudentList } from "./pages/StudentList";
import { AuthProvider } from "./context/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <h1>Capstone</h1>
      <AuthProvider>
        <div className="displayFlex">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/assignment/:id" element={
              <ProtectedRoute allowedRoles={['student', 'tutor']}>
                <Assignment />
              </ProtectedRoute>
            } />
            <Route path="/assignment" element={
              <ProtectedRoute allowedRoles={['student','tutor']}>
                  <AssignmentList />
              </ProtectedRoute>
            } />
            <Route
              path="/class"
              element={
                <ProtectedRoute allowedRoles={['student', 'tutor']}>
                  <ClassList />
                </ProtectedRoute>
              }
            />
            <Route path="/class/:id" element={
              <ProtectedRoute allowedRoles={['student','tutor']}>
                <Class />
              </ProtectedRoute>
              } />
            <Route path="/submission" element={
              <ProtectedRoute allowedRoles={['student', 'tutor']}>
                <SubmissionList />
              </ProtectedRoute>
              } />
            <Route path="/submission/:id" element={
              <ProtectedRoute allowedRoles={['student', 'tutor']}>
                <Submission />
              </ProtectedRoute>
              } />
            <Route path="/student" element={
              <ProtectedRoute allowedRoles={['tutor']}>
                <Student />
              </ProtectedRoute>} />
            <Route path="/student/:id" element={
              <ProtectedRoute allowedRoles={['tutor']}>
                <StudentList />
              </ProtectedRoute>
              } />
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
