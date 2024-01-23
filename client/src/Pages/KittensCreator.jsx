import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function KittensCreator() {

    const { id } = useParams();

    const [kittens, setKittens] = useState([]);
    const [name, setName] = useState("");
    const [weight, setWeight] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");


    const kittenFetcher = () => {
        return fetch(`/api/employees/kittens/${id}`).then(res => res.json()).catch(err => console.error(err));
    }

    useEffect(() => {
        kittenFetcher().then(res => setKittens(res))
    }, [])

    const kittenSaver = () => {

        const kitten = {
            name: name,
            weight: weight,
            employee: id
        };
        fetch(`/api/employees/kittens/${id}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(kitten) }).then(res => res.json()).catch(err => console.error(err)).then((res) => { setKittens([...kittens]) })
    }

    const filteredKittens = kittens.filter((kitten) => {
        return kitten.name.toLowerCase().includes(searchTerm.toLowerCase())
    });

    return (
        <div>Create new kitten
            <form>
                <label>Name:</label>
                <input value={name} onChange={(e) => { setName(e.target.value) }}>
                </input>
                <label>Weight:</label>
                <input value={weight} onChange={(e) => { setWeight(e.target.value) }}>
                </input>
                <label>employee:{id}</label>
                <p>
                </p>
            </form>
            <input value={searchTerm} placeholder='search' onChange={(e) => { setSearchTerm(e.target.value) }}>
            </input>
            <button onClick={() => { kittenSaver() }}>Save</button>
            <div>
                {filteredKittens.map((kitten, index) => {
                    return (<div key={index}><p>{kitten.name}</p>
                        <p>{kitten.weight}</p></div>)
                })}
            </div>
        </div>
    )
}
