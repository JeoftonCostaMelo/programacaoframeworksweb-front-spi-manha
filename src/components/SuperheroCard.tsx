import React from 'react';
import ISuperhero from '../interfaces/ISuperhero';

interface superheroCardProps {
    hero: ISuperhero;
}

const SuperheroCard: React.FC<superheroCardProps> = ({hero}) => {
    return (
        <div className='card'>
            <h2>{hero.nome}</h2>
            <ul>
                <li>Poderes: {hero.poderes.join(" | ")}</li>
                {hero.equipe && <li>Equipe: {hero.equipe}</li>}
                <li>Base Operacional: {hero.baseOperacional || 'N/A'}</li>
                <li>Status: {hero.status}</li>
                <li>Nível de Poder {hero.nivelPoder}</li>
            </ul>            
        </div>
    );
}

export default SuperheroCard;