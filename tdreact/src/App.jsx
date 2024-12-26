import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NotesTable from "./components/NotesTable";
import StudentsTable from "./components/StudentsTable";
import ClassTable from "./components/ClassTable";
import TeachersTable from "./components/TeachersTable";
import AboutSection from "./components/AboutSection";
import LoginForm from "./components/LoginForm";
import AppRouter from "./AppRouter";
import LinkWrapper from "./components/LinkWrapper"; // Importer LinkWrapper

function Header() {
    return (
        <header>
            <img
                src="https://tse3.mm.bing.net/th?id=OIP.Gmnztw8QVYkN3SZuNHKfkAAAAA&pid=Api&P=0&h=180"
                alt="Cupra"
            />
            <h1>Introduction à Votre Université</h1>
            <h2>A la découverte de votre Université CUPRA</h2>
        </header>
    );
}

function Footer() {
    const currentYear = new Date().getFullYear();
    const authorName = "Omar Nassib";

    return (
        <p>
            ©️ {currentYear} - {authorName}, Tous droits réservés
        </p>
    );
}

function MainContent() {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const dateString = currentDate.toLocaleDateString("fr-FR", options);
    const timeString = currentDate.toLocaleTimeString("fr-FR");

    return (
        <p>
            Bonjour, on est le {dateString} et il est {timeString}
        </p>
    );
}

function Menu({ menuItems, activeItem, setActiveItem }) {
    return (
        <nav style={{ position: "absolute", top: 0, left: 0, padding: "10px" }}>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {menuItems.map((item) => (
                    <li key={item.id} style={{ margin: "10px 0" }}>
                        <button
                            style={{
                                backgroundColor: activeItem === item.id ? "#0056b3" : "#007BFF",
                                color: "white",
                                border: "none",
                                padding: "8px 16px",
                                cursor: "pointer",
                            }}
                            onClick={() => setActiveItem(item.id)}
                        >
                            {item.name}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [activeItem, setActiveItem] = useState(1);

    const menuItems = [
        { id: 1, name: "Accueil", component: <p>Bienvenue sur la page d'accueil !</p>, requiresAuth: false },
        { id: 2, name: "Notes", component: <NotesTable />, requiresAuth: true },
        { id: 3, name: "Étudiants", component: <StudentsTable />, requiresAuth: true },
        { id: 4, name: "Matières", component: <ClassTable />, requiresAuth: true },
        { id: 5, name: "Enseignants", component: <TeachersTable />, requiresAuth: true },
        { id: 6, name: "À propos", component: <AboutSection />, requiresAuth: true },
    ];

    const handleLogin = (user) => {
        setIsLoggedIn(true);
        setUserInfo(user);
        alert(`Bienvenue, ${user.username} Vous êtes connecté.`);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserInfo(null);
    };

    return (
        <div>
            <Header />
            <MainContent />
            <AppRouter />
            <Menu menuItems={menuItems} activeItem={activeItem} setActiveItem={setActiveItem} />

            <div>
                <h1>Université CUPRA</h1>
                {!isLoggedIn ? (
                    <LoginForm onLogin={handleLogin} />
                ) : (
                    <div>
                        <h2>Bienvenue, {userInfo?.username}!</h2>
                        <button onClick={handleLogout} style={{ padding: "10px", cursor: "pointer" }}>
                            Se déconnecter
                        </button>
                    </div>
                )}
            </div>

            <div className="menu-content">
                {menuItems.find((item) => item.id === activeItem && (!item.requiresAuth || isLoggedIn))?.component || (
                    <p>Vous n'avez pas l'autorisation d'accéder à cette page , Se connecter svp :)</p>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default App;
