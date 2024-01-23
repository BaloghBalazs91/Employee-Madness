import Loading from "../Components/Loading";
import React, { useState, useEffect } from 'react';
import DivisionTable from "../Components/EmployeeTable/DivisionTable";

const fetchDivisions = () => {
    return fetch("/api/divisions",).then((res) => res.json());
}

const DivisionList = () => {
    const [loading, setLoading] = useState(true);
    const [divisions, setDivisions] = useState([]);

    const deleteDivision = (id) => {
        return fetch(`/api/divisions/${id}`, { method: "DELETE" }).then((res) =>
            res.json()
        );
    };

    const handleDelete = (id) => {
        deleteDivision(id);
        setDivisions((divisions) => {
            return divisions.filter((divisions) => divisions._id !== id);
        });
    };
    useEffect(() => {
        fetchDivisions()
            .then((divisions) => {
                setLoading(false);
                setDivisions(divisions);
            }).catch((error => {
                console.log(error);
                setLoading(false);
            }))
    }, []);
    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <DivisionTable divisions={divisions} setEmployees={setDivisions} onDelete={handleDelete} />
        </div>
    );
};

export default DivisionList;


