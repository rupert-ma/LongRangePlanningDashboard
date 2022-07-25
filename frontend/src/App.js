// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootswatch/dist/spacelab/bootstrap.min.css"; // Added this :boom:

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import TeamsPage from "./pages/TeamsPage/TeamsPage";
import TasksPage from "./pages/TasksPage/TasksPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <HomePage />
                        </PrivateRoute>
                    }
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/teams" element={<TeamsPage />} />
                <Route path="/alltasks" element={<TasksPage />} />
            </Routes>
            {/* <Footer /> */}
        </div>
    );
}

export default App;
