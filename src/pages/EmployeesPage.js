import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import Employees from '../components/Employees';
import EmployeesBD from '../components/EmployeesBD';

const sortedEmployees = employees => {
  if (employees.length) {
    const sortedEmployees = employees.sort((a, b) => {
      const nameA = a.lastName.toLowerCase();
      const nameB = b.lastName.toLowerCase();

      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });
    return sortedEmployees;
  }

  return [];
};

const parsedEmployees = JSON.parse(localStorage.getItem('employees'));

const EmployeesPage = () => {
  const [employees, setEmployees] = useState(parsedEmployees || []);
  const [activeEmployees, setActiveEmployees] = useState([]);

  const sortedEmployeesbyLastname = sortedEmployees(employees);
  const sortedActiveEmployeesbyLastname = sortedEmployees(activeEmployees);

  const handleAddActiveEmployer = employer => {
    const persistedEmployer = activeEmployees.filter(
      emp => emp.id === employer.id,
    );

    if (persistedEmployer.length === 0) {
      setActiveEmployees([...activeEmployees, employer]);
    } else {
      return;
    }
  };

  const handleDeleteActiveEmployer = id => {
    if (activeEmployees.length > 0) {
      setActiveEmployees(activeEmployees.filter(emp => emp.id !== id));
    }

    return;
  };

  useEffect(() => {
    const parsedActiveEmployees = JSON.parse(
      localStorage.getItem('activeEmployees'),
    );

    if (parsedActiveEmployees) {
      setActiveEmployees(parsedActiveEmployees);
    }

    axios
      .get('https://yalantis-react-school-api.yalantis.com/api/task0/users')
      .then(({ data }) => setEmployees(data));

    return () => {
      console.log('cleaned up');
    };
  }, []);

  useEffect(() => {
    const activeEmployeesJSON = JSON.stringify(activeEmployees);
    localStorage.setItem('activeEmployees', activeEmployeesJSON);

    const employeesJson = JSON.stringify(employees);
    localStorage.setItem('employees', employeesJson);
  }, [employees, activeEmployees]);

  return (
    <Fragment>
      <Employees
        onAddActiveEmployees={handleAddActiveEmployer}
        onDeleteEmployerById={handleDeleteActiveEmployer}
        employees={sortedEmployeesbyLastname}
      />
      {(sortedActiveEmployeesbyLastname.length && (
        <EmployeesBD employees={sortedActiveEmployeesbyLastname} />
      )) || <h2 style={{ color: 'palegoldenrod' }}>Employees List is empty</h2>}
    </Fragment>
  );
};

export { EmployeesPage as default };
