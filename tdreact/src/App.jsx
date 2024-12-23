import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Header(){
    return(
        <header>
            <img src="https://tse3.mm.bing.net/th?id=OIP.a-YN_jkAnb0MGFFEFR-d3wHaGB&pid=Api&P=0&h=180" alt="Cupra"/>
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
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Header />
        <MainContent />


      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Omar Nassib Using Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
        <Footer />
    </>
  )
}

export default App
