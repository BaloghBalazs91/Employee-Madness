import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EmployeeTable/EquipmentTable";

const fetchEquipments = () => {
  return fetch("/api/equipments").then((res) => res.json());
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipments/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const updateEquipment = (equipment) => {
  return fetch(`/api/equipments/${equipment._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(equipment),
  }).then((res) => res.json());
};

const EquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [equipments, setEquipments] = useState(null);

  const handleDelete = (id) => {
    deleteEquipment(id).then(() => {
      setEquipments((prevEquipments) =>
        prevEquipments.filter((equipment) => equipment._id !== id)
      );
    });
  };

  const handleUpdate = (updatedEquipment) => {
    updateEquipment(updatedEquipment).then((equipment) => {
      setEquipments((prevEquipments) =>
        prevEquipments.map((prevEquipment) =>
          prevEquipment._id === equipment._id ? equipment : prevEquipment
        )
      );
    });
  };

  useEffect(() => {
    fetchEquipments().then((equipment) => {
      setLoading(false);
      setEquipments(equipment);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <EquipmentTable
        equipments={equipments}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default EquipmentList;
