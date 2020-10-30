import React from 'react';

const Results = ({players, gameType, maximumPoints}) => {
    let teamCorrectAnswers = Object.entries(players).reduce((total, [teamName, teamPlayers]) => {
        let teamResult = Object.values(teamPlayers).reduce((acc, {correctAnswers}) => acc + correctAnswers, 0)
        return {...total, [teamName]: teamResult}
    }, [])

    return (
        <div>
            <p>Results go here:</p>
            {
                // Redo the calculations after BE fix
                gameType === 'single' ?
                Object.entries(players).map(([playerName, {correctAnswers}]) => <p key={playerName}>{`${playerName} has ${(correctAnswers / maximumPoints) * 100}`}</p>) :
                Object.keys(players).map((teamName) => <p key={teamName}>{`${teamName} has ${(teamCorrectAnswers[teamName] / maximumPoints) * 100}`}</p>)
            }
        </div>
    )
}

export default Results;
