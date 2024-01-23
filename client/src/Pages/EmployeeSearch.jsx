import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import { useParams } from "react-router-dom";

const fetchEmployees = (searchQuery = "") => {
    return fetch(`/api/employees/search/${searchQuery}`).then((res) => res.json());
};

const deleteEmployee = (id) => {
    return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
        res.json()
    );
};

const EmployeeSearch = () => {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState(null);
    const { search } = useParams();//mit jelent a search körüli zárójel, useParams működése

    const handleDelete = (id) => {
        deleteEmployee(id);

        setEmployees((employees) => {
            return employees.filter((employee) => employee._id !== id);
        });
    };

    useEffect(() => {
        fetchEmployees(search)
            .then((employees) => {
                setLoading(false);
                setEmployees(employees);
            })
    }, [search]);

    if (loading) {
        return <Loading />;
    }

    return <EmployeeTable employees={employees} onDelete={handleDelete} />;
};

export default EmployeeSearch;
