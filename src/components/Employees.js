import styles from '../styles/Employees.module.css';
import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Employer from './Employer';
import arr_EN from '../data/arr_EN';

const Employees = ({
  employees,
  onAddActiveEmployees,
  onDeleteEmployerById,
}) => {
  const [checkedValues, setCheckedValues] = useState([]);
  const handleFindEmployer = (id, value) => {
    if (value === 'true') {
      const activeEmployer = employees.filter(e => e.id === id)[0];
      onAddActiveEmployees(activeEmployer);

      const newCheckedValue = {
        checkedValue: true,
        id,
        color: 'red',
      };

      setCheckedValues([...checkedValues, newCheckedValue]);
    } else if (value === 'false') {
      setCheckedValues(checkedValues.filter(value => value.id !== id));
      onDeleteEmployerById(id);
    }
  };

  useEffect(() => {
    const parsedValues = JSON.parse(localStorage.getItem('checkedValues'));
    if (parsedValues) {
      setCheckedValues(parsedValues);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('checkedValues', JSON.stringify(checkedValues));
  }, [checkedValues]);

  const markup = (
    <div className={styles.wrapper}>
      {
        <ul className={styles.empList}>
          {arr_EN.map(letter => (
            <li key={letter}>
              <h4>{letter}</h4>
              <Fragment>
                {(employees
                  .filter(emp => letter === emp.lastName.charAt(0))
                  .map(emp => <Employer />).length &&
                  employees
                    .filter(emp => letter === emp.lastName.charAt(0))
                    .map(emp => (
                      <Employer
                        onFindEmployerID={handleFindEmployer}
                        key={emp.id}
                        employer={emp}
                        values={checkedValues}
                        checkedValues={checkedValues}
                      />
                    ))) || <p>---</p>}
              </Fragment>
            </li>
          ))}
        </ul>
      }
    </div>
  );
  return <Fragment>{markup}</Fragment>;
};

Employees.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      lastName: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,

  onAddActiveEmployees: PropTypes.func.isRequired,
  onDeleteEmployerById: PropTypes.func.isRequired,
};

export { Employees as default };
