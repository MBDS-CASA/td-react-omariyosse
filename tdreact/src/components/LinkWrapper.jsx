import React, { useState } from 'react';

function LinkWrapper({ href, children, component }) {
    const [showComponent, setShowComponent] = useState(false);

    // Fonction qui intercepte le clic
    const handleClick = (e) => {
        e.preventDefault(); // Empêcher la redirection par défaut
        setShowComponent(true); // Afficher le composant associé
    };

    return (
        <div>
            <a href={href} onClick={handleClick} style={{ cursor: 'pointer', color: 'blue' }}>
                {children}
            </a>
            {showComponent && (
                <div style={{ marginTop: '20px' }}>
                    {component}
                </div>
            )}
        </div>
    );
}

export default LinkWrapper;
