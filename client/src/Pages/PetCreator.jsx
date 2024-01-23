import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function PetrCreator() {
    const [pets, setPets] = useState([]);
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [type, setType] = useState("");

    const { id } = useParams();

    const petFetcher = () => {
        return fetch(`/api/employees/pets/${id}`).then(res => res.json()).catch(err => console.error(err));
    }

    const petSaver = () => {
        const pet = {
            name: name,
            color: color,
            type: type
        };
        fetch(`/api/employees/pets/${id}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(pet) }).then(res => res.json()).catch(err => console.error(err)).then((res) => { setPets([...pets]) })
    }


    useEffect(() => {
        petFetcher().then(res => setPets(res))
    }, [])

    return (
        <div>Pet Creator
            <form>
                <label>Animal Name:</label>
                <input value={name} onChange={(e) => { setName(e.target.value) }}>
                </input>
                <label>Animal Color:</label>
                <input value={color} onChange={(e) => { setColor(e.target.value) }}>
                </input>
                <label>Animal Type:</label>
                <input value={type} onChange={(e) => { setType(e.target.value) }}>
                </input>
                <button onClick={() => { petSaver() }}>Save</button>
            </form>
            <div>
                {pets.map((pet) => {
                    return (<div>
                        <p>{pet.name}</p>
                        <p>{pet.color}</p>
                        <p>{pet.type}</p>
                    </div>)
                })}
            </div>
        </div>
    )
}
