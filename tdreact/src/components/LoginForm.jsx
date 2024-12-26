import React, { useState } from 'react';

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            onLogin({ username, password });
            setUsername('');
            setPassword('');
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '20px auto' }}>
            <h2>Connexion</h2>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    Nom d'utilisateur :
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    Mot de passe :
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </label>
            </div>
            <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                Se connecter
            </button>
        </form>
    );
}

export default LoginForm;
