import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DivisionTable.css';
import Searchbar from './Searchbar';

const DivisionTable = ({ setDivisions, divisions, onDelete }) => {
  const [headerName, setHeaderName] = useState(null);
  const [order, setOrder] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // const updatedDivision = divisions.map((division) => {
  //   fetch(`/api/divisions/${division._id}`, {
  //     method: 'PATCH',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(division),
  //   }).then((res) => res.json());
  // })


  const handleArrange = (prop) => {
    setOrder(!order);
    setHeaderName(prop);
    const sortedDivisions = [...divisions];
    if (order) {
      if (prop.includes('location')) {
        sortedDivisions.sort((a, b) => a.location[prop] - b.location[prop]);
      } else {
        sortedDivisions.sort((a, b) => a[prop].localeCompare(b[prop]));
      }
    } else {
      if (prop.includes('location')) {
        sortedDivisions.sort((a, b) => b.location[prop] - a.location[prop]);
      } else {
        sortedDivisions.sort((a, b) => b[prop].localeCompare(a[prop]));
      }
    }
    setDivisions(sortedDivisions);
  };

  const getSortIndicator = (prop) => {
    if (prop === headerName) {
      return order ? '↑' : '↓';
    }
    return null;
  };

  const confirmDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this division?')) {
      onDelete(id);
    }
  };

  const filteredDivisions = divisions.filter((division) => {
    return (
      division.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      division.boss.toLowerCase().includes(searchTerm.toLowerCase()) ||
      division.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      division.location.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="DivisionTable">
      <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleArrange('name')}>
              Division Name {getSortIndicator('name')}
            </th>
            <th onClick={() => handleArrange('boss')}>
              Boss {getSortIndicator('boss')}
            </th>
            <th onClick={() => handleArrange('location_city')}>
              City {getSortIndicator('location_city')}
            </th>
            <th onClick={() => handleArrange('location_country')}>
              Country {getSortIndicator('location_country')}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredDivisions.map((division) => (
            <tr key={division._id}>
              <td>{division.name}</td>
              <td>{division.boss}</td>
              <td>{division.location.city}</td>
              <td>{division.location.country}</td>
              <td>
                <Link to={`/divisions/update/${division._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => confirmDelete(division._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DivisionTable;
