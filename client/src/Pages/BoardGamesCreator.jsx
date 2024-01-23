import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function BoardGamesCreator() {
    const [name, setName] = useState("");
    const [maxPlayers, setMaxPlayers] = useState();
    const [boardGames, setBoardGames] = useState("");

    const boardGamesFetcher = () => {
        return fetch('/api/boardgames').then(res => res.json()).catch(err => console.error(err));
    }
    useEffect(() => {
        boardGamesFetcher().then(res => setBoardGames(res))
    }, [])

    const boardGamesSaver = () => {
        const boardGame = {
            name: name,
            maxPlayers: maxPlayers
        };
        fetch('/api/boardgames/', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(boardGame) }).then(res => res.json()).catch(err => console.error(err)).then((res) => { setBoardGames([...boardGames, res]) })
    }

    return (
        <div>BoardGamesCreator
            <label>Name:</label>
            <input value={name} onChange={(e) => setName(e.target.value)}></input>
            <label>Maximum Players:</label>
            <input value={maxPlayers} onChange={(e) => setMaxPlayers(e.target.value)}></input>
            <button onClick={() => { boardGamesSaver() }}>Save</button>
        </div>
    )
}
