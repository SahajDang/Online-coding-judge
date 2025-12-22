import { Route, Routes } from "react-router-dom";
import { Login } from "../../modules/user/pages/Login";
import { Register } from "../../modules/user/pages/Register";
import { Home } from "../../modules/home/pages/Home";
import { StudentDashboard } from "../../modules/dashboard/pages/StudentDashBoard.jsx";
import { TeacherDashboard } from "../../modules/dashboard/pages/TeacherDashBoard.jsx";
import { ProblemSolved } from "../../modules/questions/pages/ProblemSolved.jsx";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element = { <Home /> } />
            <Route path="login" element = { <Login /> } />
            <Route path="register" element = { <Register /> } />
            {/* DashBaord Routes */}
            <Route path="dashboard/student" element = {<StudentDashboard/>} />
            <Route path="dashboard/teacher" element = {<TeacherDashboard/>} />
            <Route path="problem" element = {<ProblemSolved/>} />
        </Routes>
    );
};