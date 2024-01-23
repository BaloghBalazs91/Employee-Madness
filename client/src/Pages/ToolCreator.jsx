import React, { useEffect, useState } from 'react'

export default function ToolCreator() {
    const [tools, setTools] = useState([]);
    const [name, setName] = useState("");
    const [weight, setWeight] = useState("");


    const toolFetcher = () => {
        return fetch('/api/tools').then(res => res.json()).catch(err => console.error(err));
    }
    useEffect(() => {
        toolFetcher().then(res => setTools(res))
    })

    const toolSaver = () => {
        const tool = {
            name: name,
            weight: weight
        }
        fetch(`/api/tools/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(tool) }).then(res => res.json()).catch(err => console.error(err)).then((res) => { setTools([...tools]) })
    }
    return (
        <div>ToolCreator
            <div>
                {tools.map((tool) => {
                    return <div><label>Name:</label>
                        <label>{tool.name}</label>
                        <label>Weight:</label>
                        <label>{tool.weight}</label>
                    </div>
                })}

            </div>
            <div>
                <label>Add a new Tool</label>

                <input value={name} placeholder={"Add Name..."} onChange={(e) => { setName(e.target.value) }}>
                </input>
                <input value={weight} placeholder={"Add Weight..."} onChange={(e) => { setWeight(e.target.value) }}>
                </input>

            </div>
            <button onClick={() => { toolSaver() }}>Save</button>
        </div>
    )
}
