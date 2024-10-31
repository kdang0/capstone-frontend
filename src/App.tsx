import { Route, Routes } from "react-router-dom";
import { Assignment } from "./pages/Assignment/Assignment";
import { Login } from "./pages/Login";
import "./App.css";
import { AssignmentList } from "./pages/AssignmentList/AssignmentList";
import { ClassList } from "./pages/ClassList";
import { Class } from "./pages/Class";
import { Submission } from "./pages/Submission";
import { SubmissionList } from "./pages/SubmissionList";
import { Student } from "./pages/Student";
import { StudentList } from "./pages/StudentList";
import { AuthProvider } from "./context/AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AssignmentCreate } from "./pages/AssignmentCreate";
import Navbar from "./components/Navbar/Navbar";
import { AssignmentEdit } from "./pages/AssignmentEdit";
import { AssignmentDisplay } from "./pages/AssignmentDisplay";

function App() {
  return (
    <>
      {/*
       * ==================================
       * | Authentication + Authorization |
       * ==================================
       * AuthProvider is a context provider that checks to see if there is an authenticated user and if so provide information regarding the authenticated user
       * 
       * ProtectedRoute component uses the context provided by AuthProvider to check if the user is authenticated and authorized by role. If the user is either not authenticated or authorized, then it sends them back to the login page 
      */}
      <AuthProvider>
        <div className="displayFlex appContainer">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/assignment/view/:id" element={
              <ProtectedRoute allowedRoles={['tutor']}>
                <AssignmentDisplay />
              </ProtectedRoute>
            } />
            <Route path="/class/:classId/assignment/:assignmentId" element={
              <ProtectedRoute>
                <Assignment/>
              </ProtectedRoute>
            }/>
            <Route path="/assignment" element={
              <ProtectedRoute allowedRoles={['student','tutor']}>
                  <AssignmentList />
              </ProtectedRoute>
            } />
            <Route path="/assignment/create" element={
              <ProtectedRoute allowedRoles={['tutor']}>
                <AssignmentCreate/>
              </ProtectedRoute>
            }/>
            <Route path="/assignment/edit/:id" element={
              <ProtectedRoute allowedRoles={['tutor']}>
                  <AssignmentEdit/>
              </ProtectedRoute>
            }/>
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
                <StudentList />
              </ProtectedRoute>} />
            <Route path="/student/:id" element={
              <ProtectedRoute allowedRoles={['tutor']}>
                <Student />
              </ProtectedRoute>
              } />
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
