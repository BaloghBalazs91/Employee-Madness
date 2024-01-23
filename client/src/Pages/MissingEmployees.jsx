import { useEffect, useState } from "react";
import Loading from "../Components/Loading";

const fetchMissingEmployees = () => {
    return fetch("/api/employees/attendance/missing").then((res) => res.json());
};

const MissingEmployees = () => {
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchMissingEmployees()
            .then((employees) => {
                setLoading(false);
                setEmployees(employees);
            })
            .catch((error) => {
                console.error("Error fetching missing employees:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='MissingEmployees'>

            <table>
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>Level
                        </th>
                        <th>
                            Position
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.name}</td>
                            <td>{employee.level}</td>
                            <td>{employee.position}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MissingEmployees;
