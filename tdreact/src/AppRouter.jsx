import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotesTable from "./components/NotesTable";
import StudentsTable from "./components/StudentsTable";
import ClassTable from "./components/ClassTable";
import TeachersTable from "./components/TeachersTable";
import AboutSection from "./components/AboutSection";

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1>Bienvenue sur la page d'accueil</h1>} />
                <Route path="/notes" element={<NotesTable />} />
                <Route path="/etudiants" element={<StudentsTable />} />
                <Route path="/matieres" element={<ClassTable />} />
                <Route path="/enseignants" element={<TeachersTable />} />
                <Route path="/apropos" element={<AboutSection />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
