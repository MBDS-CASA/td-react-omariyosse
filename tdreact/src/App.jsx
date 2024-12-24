import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import NotesTable from './components/NotesTable';
import StudentsTable from './components/StudentsTable';
import ClassTable from './components/ClassTable';
import TeachersTable from './components/TeachersTable';
import AboutSection from "./components/AboutSection";


function Header() {
    return (
        <header>
            <img src="https://tse3.mm.bing.net/th?id=OIP.Gmnztw8QVYkN3SZuNHKfkAAAAA&pid=Api&P=0&h=180" alt="Cupra" />
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

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = currentDate.toLocaleDateString('fr-FR', options);
    const timeString = currentDate.toLocaleTimeString('fr-FR');

    return (
        <p>
            Bonjour, on est le {dateString} et il est {timeString}
        </p>
    );
}

function RandomItem({ item }) {
    if (!item) return <p>Chargement...</p>;

    return (
        <div style={{ border: "1px solid #ccc", padding: "16px", margin: "16px" }}>
            <h3>{item.course}</h3>
            <p>
                Étudiant: {item.student.firstname} {item.student.lastname} (ID:{" "}
                {item.student.id})
            </p>
            <p>Date: {item.date}</p>
            <p>Note: {item.grade}</p>
        </div>
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
    const menuItems = [
        { id: 1, name: "Accueil", component: <p>Bienvenue sur la page d'accueil !</p> },
        { id: 2, name: "Notes", component: <NotesTable /> },
        { id: 3, name: "Etudiants", component: <StudentsTable /> },
        { id: 4, name: "Matières", component: <ClassTable /> },
        { id: 5, name: "Enseignants", component: <TeachersTable /> },
        { id: 6, name: "À propos", component: <AboutSection /> },
    ];

    const [activeItem, setActiveItem] = useState(menuItems[0].id);
    const [data, setData] = useState([]);
    const [randomItem, setRandomItem] = useState(null);

    useEffect(() => {
        fetch("/data.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load data");
                }
                return response.json();
            })
            .then((jsonData) => setData(jsonData))
            .catch((error) =>
                console.error("Erreur lors du chargement des données:", error)
            );
    }, []);

    const pickRandomItem = () => {
        if (data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            setRandomItem(data[randomIndex]);
        }
    };

    return (
        <>
            <Menu menuItems={menuItems} activeItem={activeItem} setActiveItem={setActiveItem}/>
            <Header/>
            <MainContent/>

            <div>
                <a href="https://vite.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Omar Nassib Using Vite + React</h1>
            <div className="card">
                <button onClick={pickRandomItem}>Afficher un élément aléatoire</button>
            </div>
            <RandomItem item={randomItem}/>

            <div className="menu-content">
                {menuItems.find((item) => item.id === activeItem).component}
            </div>

            <Footer/>
        </>
    );
}

export default App;
