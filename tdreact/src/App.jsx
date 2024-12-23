import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Header(){
    return(
        <header>
            <img src="https://tse3.mm.bing.net/th?id=OIP.Gmnztw8QVYkN3SZuNHKfkAAAAA&pid=Api&P=0&h=180" alt="Cupra"/>
            <h1>Introduction à React</h1>
            <h2>A la découverte des premières notions de React</h2>
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

function App() {
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
            <Header />
            <MainContent />
            <div>
                <a href="https://vite.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Omar Nassib Using Vite + React</h1>
            <div className="card">
                <button onClick={pickRandomItem}>Afficher un élément aléatoire</button>
            </div>
            <RandomItem item={randomItem} />
            <Footer />
        </>
    );
}

export default App;