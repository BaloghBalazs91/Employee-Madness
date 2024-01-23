import { useEffect, useState } from "react";
import { json } from "react-router-dom";

const DivisionForm = ({ onSave, disabled, division, onCancel }) => {
  const [name, setName] = useState(division?.name ?? "");
  const [boss, setBoss] = useState(division?.boss ?? "");
  const [budget, setBudget] = useState(division?.budget ?? "");
  const [locationCity, setLocationCity] = useState(division?.location.city ?? "");
  const [locationCountry, setLocationCountry] = useState(division?.location.country ?? "");
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {
    return fetch("/api/employees").then(employees => employees.json()).catch(err => console.error(err));
  }

  useEffect(() => {
    fetchEmployees().then((employees) => {
      setEmployees(employees);
    })
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedDivision = {
      ...division,
      name,
      boss,
      budget,
      location: {
        city: locationCity,
        country: locationCountry,
      },
    };

    onSave(updatedDivision);
  };


  return (
    <form className="DivisionForm" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="boss">Boss:</label>
        <select
          value={boss}
          onChange={(e) => setBoss(e.target.value)}
          name="boss"
          id="boss"
        >
          <option value="">Select Boss</option>

          {employees.map((employee) => {
            return (
              <option
                key={employee.name} value={employee.name}>{employee.name}
              </option>)
          })
          }
        </select>
      </div>

      <div className="control">
        <label htmlFor="budget">Budget:</label>
        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          name="budget"
          id="budget"
        />
      </div>

      <div className="control">
        <label htmlFor="city">City:</label>
        <input
          value={locationCity}
          onChange={(e) => setLocationCity(e.target.value)}
          name="city"
          id="city"
        />
      </div>
      <div className="control">
        <label htmlFor="country">Country:</label>
        <input
          value={locationCountry}
          onChange={(e) => setLocationCountry(e.target.value)}
          name="country"
          id="country"
        />
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {division ? "Update Division" : "Create Division"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default DivisionForm;
