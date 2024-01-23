import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EntityTable from "../Components/EntityTable";

const fetchEntities = () => {
    return fetch("/api/equipment").then((res) => res.json());
};

const deleteEntity = (id) => {
    return fetch(`/api/equipment/${id}`, { method: "DELETE" }).then((res) =>
        res.json()
    );
};

const EntityList = () => {
    const [loading, setLoading] = useState(true);
    const [entities, setEntities] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [amountFilter, setAmountFilter] = useState("");
    const [arrange, setArrange] = useState("");

    const handleDelete = (id) => {
        deleteEntity(id);
        setEntities((entities) => {
            return entities.filter((entity) => entity._id !== id);
        });
    };

    useEffect(() => {
        fetchEntities().then((entities) => {
            setLoading(false);
            setEntities(entities);
        });
    }, []);

    if (loading) {
        return <Loading />;
    }

    const filteredEntities = entities.filter((entity) => {
        const matchesSearchTerm = entity.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesType = typeFilter === "" ? true : entity.type === typeFilter;

        const matchesAmount =
            amountFilter === "" ? true : entity.amount === parseInt(amountFilter);

        return matchesSearchTerm && matchesType && matchesAmount;
    });

    let arrangedEntities = filteredEntities;

    switch (arrange) {
        case "Name":
            arrangedEntities = arrangedEntities.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            break;
        case "Type":
            arrangedEntities = arrangedEntities.sort((a, b) =>
                a.type.localeCompare(b.type)
            );
            break;
        case "Amount":
            arrangedEntities = arrangedEntities.sort((a, b) =>
                a.amount - b.amount
            );
            break;
        default:
            break;
    }

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for name..."
            />
            <div>
                <label>Type:</label>
                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                    <option value="">All</option>
                    <option value="Type 1">Type 1</option>
                    <option value="Type 2">Type 2</option>
                    <option value="Type 3">Type 3</option>
                </select>
            </div>
            <div>
                <label>Amount:</label>
                <input
                    type="number"
                    value={amountFilter}
                    onChange={(e) => setAmountFilter(e.target.value)}
                    placeholder="Enter amount..."
                />
            </div>
            <div>
                <label>Arrange by:</label>
                <select value={arrange} onChange={(e) => setArrange(e.target.value)}>
                    <option value="">None</option>
                    <option value="Name">Name</option>
                    <option value="Type">Type</option>
                    <option value="Amount">Amount</option>
                </select>
            </div>
            <EntityTable entities={arrangedEntities} onDelete={handleDelete} />
        </div>

    );
};

export default EntityList;
