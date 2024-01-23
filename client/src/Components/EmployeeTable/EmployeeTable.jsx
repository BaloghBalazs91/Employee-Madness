import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EmployeeTable.css';
import Searchbar from './Searchbar';
import Pagination from './Pagination';

const EmployeeTable = ({ setEmployees, employees, onDelete }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState(null);
  const [order, setOrder] = useState(false);
  const [headerName, setHeaderName] = useState(null);
  const itemsPerPage = 10;
  const [startIndex, setStartIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(employees.length / itemsPerPage));
  const [endIndex, setEndIndex] = useState((currentPage + 1) * itemsPerPage);
  const [favoriteBrands, setFavoriteBrands] = useState({});

  useEffect(() => {
    setTotalPages(Math.ceil(employees.length / itemsPerPage));
    setStartIndex((currentPage - 1) * itemsPerPage);
    setEndIndex(currentPage * itemsPerPage);
  }, [employees, currentPage]);

  useEffect(() => {
    fetch("/api/favoritebrands")
      .then((res) => res.json())
      .then((brands) => {
        const brandsMap = {};
        brands.forEach((brand) => {
          brandsMap[brand._id] = brand.name;
        });
        setFavoriteBrands(brandsMap);
      })
      .catch((error) => {
        console.log("Error fetching favorite brands:", error);
      });
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset current page when search term changes
  }, [searchTerm]);

  function handleArrange(prop) {
    setOrder(!order);
    setHeaderName(prop);
    const sortedEmployees = [...employees];
    if (order) {
      if (prop.includes('salary')) {
        sortedEmployees.sort((a, b) => a.salary[prop] - b.salary[prop]);
      } else {
        sortedEmployees.sort((a, b) => a[prop].localeCompare(b[prop]));
      }
    } else {
      if (prop.includes('salary')) {
        sortedEmployees.sort((a, b) => b.salary[prop] - a.salary[prop]);
      } else {
        sortedEmployees.sort((a, b) => b[prop].localeCompare(a[prop]));
      }
    }
    setEmployees(sortedEmployees);
  }

  function getSortIndicator(prop) {
    if (prop === headerName) {
      return order ? '↑' : '↓';
    }
    return null;
  }

  function handleAttendance(employee) {
    const updatedEmployees = employees.map((emp) => {
      if (emp._id === employee._id) {
        return {
          ...emp,
          present: !emp.present,
        };
      }
      return emp;
    });

    setEmployees(updatedEmployees);

    const updateEmployee = {
      ...employee,
      present: !employee.present,
    };

    fetch(`/api/employees/${employee._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateEmployee),
    }).then((res) => res.json());
  }

  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      onDelete(id);
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    if (searchTerm && !filterTerm) {
      return (
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.middleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${employee.firstName} ${employee.middleName} ${employee.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    } else if (searchTerm && filterTerm === 'position') {
      return employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchTerm && filterTerm === 'level') {
      return employee.level.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  return (
    <div className='EmployeeTable'>
      <Pagination
        employees={filteredEmployees}
        startIndex={startIndex}
        endIndex={endIndex}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalPages={Math.ceil(filteredEmployees.length / itemsPerPage)}
        setCurrentPage={setCurrentPage}
      />
      <Searchbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterTerm={filterTerm}
        setFilterTerm={setFilterTerm}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleArrange('firstName')}>
              Firstname {getSortIndicator('firstName')}
            </th>
            <th onClick={() => handleArrange('middleName')}>
              Middlename {getSortIndicator('middleName')}
            </th>
            <th onClick={() => handleArrange('lastName')}>
              Lastname {getSortIndicator('lastName')}
            </th>
            <th onClick={() => handleArrange('level')}>
              Level {getSortIndicator('level')}
            </th>
            <th onClick={() => handleArrange('position')}>
              Position {getSortIndicator('position')}
            </th>
            <th onClick={() => handleArrange('favoriteBrand')}>
              Favorite Brand {getSortIndicator('favoriteBrand')}
            </th>
            <th onClick={() => handleArrange('starting_day')}>
              Starting Day {getSortIndicator('starting_day')}
            </th>
            <th onClick={() => handleArrange('actual_salary')}>
              Actual Salary {getSortIndicator('actual_salary')}
            </th>
            <th onClick={() => handleArrange('desired_salary')}>
              Desired Salary {getSortIndicator('desired_salary')}
            </th>
            <th onClick={() => handleArrange('salary_difference')}>
              Salary Difference{getSortIndicator('salary_difference')}
            </th>
            <th onClick={() => handleArrange('boss')}>
              Boss {getSortIndicator('boss')}
            </th>
            <th onClick={() => handleArrange('division')}>
              Division {getSortIndicator('division')}
            </th>
            <th onClick={() => handleArrange('present')}>
              Present {getSortIndicator('present')}
            </th>
            <th onClick={() => handleArrange('boardgame')}>
              favBGame {getSortIndicator('boardgame')}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.slice(startIndex, endIndex).map((employee) => (
            <tr key={employee._id} style={{ color: employee.favorite_color }}>
              <td>{employee.firstName}</td>
              <td>{employee.middleName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>{favoriteBrands[employee.favoriteBrand]}</td>
              <td>{employee.starting_day}</td>
              <td>{employee.salary.actual_salary}</td>
              <td>{employee.salary.desired_salary}</td>
              <td>{employee.salary.salary_difference}</td>
              <td>{employee.boss}</td>
              <td>{employee.division}</td>
              <td>{employee.boardGame}</td>
              <td>
                <input
                  type='checkbox'
                  name='present'
                  checked={employee.present}
                  onChange={() => handleAttendance(employee)}
                ></input>
              </td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button type='button'>Update</button>
                </Link>
                <button type='button' onClick={() => confirmDelete(employee._id)}>
                  Delete
                </button>
                <button type='button' onClick={() => navigate(`/employees/pets/${employee._id}`)}>
                  Add Pets
                </button>
                <button type='button' onClick={() => navigate(`/employees/kittens/${employee._id}`)}>
                  Add Kittens
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
