import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";


const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);



  const handleDelete = (id) => {
    deleteEmployee(id);
    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees().then((employees) => {
      setLoading(false);
      const updatedEmployees = employees.map((employee) => {
        let firstName = "";
        let middleName = "";
        let lastName = "";

        if (employee.name.split(" ").length === 3) {
          firstName = employee.name.split(" ")[0];
          middleName = employee.name.split(" ")[1];
          lastName = employee.name.split(" ")[2];
        } else {
          firstName = employee.name.split(" ")[0];
          middleName = "";
          lastName = employee.name.split(" ")[1];
        }

        return {
          ...employee,
          firstName,
          middleName,
          lastName,
        };
      });
      setEmployees(updatedEmployees);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }


  return (
    <div>
      <EmployeeTable employees={employees} setEmployees={setEmployees} onDelete={handleDelete} />
    </div>
  );
};

export default EmployeeList;
