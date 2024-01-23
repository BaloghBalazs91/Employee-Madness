import { Link } from "react-router-dom";
import "./EquipmentTable.css";
import { useState, useEffect } from 'react';

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};



const EquipmentTable = ({ equipments, onDelete, onUpdate }) => {
  const [editedEquipment, setEditedEquipment] = useState({});
  const [employees, setEmployees] = useState("")

  const handleEdit = (equipment) => {
    setEditedEquipment(equipment);
  };
  useEffect(() => {
    fetchEmployees().then((employees) => {
      setEmployees(employees);
    })
  });

  const handleSave = () => {
    onUpdate(editedEquipment);
    setEditedEquipment({});
  };

  const handleCancel = () => {
    setEditedEquipment({});
  };

  return (
    <div className="EquipmentTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Assigned to:</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipments.map((equipment) => (
            <tr key={equipment._id}>
              <td>
                {editedEquipment._id === equipment._id ? (
                  <input
                    type="text"
                    value={editedEquipment.name}
                    onChange={(e) =>
                      setEditedEquipment({
                        ...editedEquipment,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  equipment.name
                )}
              </td>
              <td>
                {editedEquipment._id === equipment._id ? (
                  <input
                    type="text"
                    value={editedEquipment.type}
                    onChange={(e) =>
                      setEditedEquipment({
                        ...editedEquipment,
                        type: e.target.value,
                      })
                    }
                  />
                ) : (
                  equipment.type
                )}
              </td>
              <td>
                {editedEquipment._id === equipment._id ? (
                  <input
                    type="number"
                    value={editedEquipment.amount}
                    onChange={(e) =>
                      setEditedEquipment({
                        ...editedEquipment,
                        amount: parseInt(e.target.value),
                      })
                    }
                  />
                ) : (
                  equipment.amount
                )}
              </td>
              <td>
                {editedEquipment._id === equipment._id ? (
                  <select
                    type="text"
                    value={editedEquipment.assigned_to}
                    onChange={(e) =>
                      setEditedEquipment({
                        ...editedEquipment,
                        assigned_to: e.target.value,
                      })
                    }
                  >
                    <option value="">Select a name</option>
                    {employees.map((employee) => (
                      <option key={employee._id} value={employee.name}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  equipment.assigned_to
                )}
              </td>
              <td>
                {editedEquipment._id === equipment._id ? (
                  <>
                    <button type="button" onClick={handleSave}>
                      Save
                    </button>
                    <button type="button" onClick={handleCancel}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button type="button" onClick={() => handleEdit(equipment)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => onDelete(equipment._id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTable;
