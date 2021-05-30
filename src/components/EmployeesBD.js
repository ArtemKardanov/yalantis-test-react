import styles from '../styles/EmployeesBD.module.css';

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

let monthArr = [
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const EmployeesBD = ({ employees }) => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.empList}>
        {monthArr.map(
          month =>
            employees.filter(
              emp =>
                month.toLowerCase() ===
                new Date(emp.dob)
                  .toLocaleString('en', { month: 'long' })
                  .toLowerCase(),
            ).length > 0 && (
              <li key={month}>
                <h4>{month}</h4>
                <Fragment>
                  {employees
                    .filter(
                      emp =>
                        month.toLowerCase() ===
                        new Date(emp.dob)
                          .toLocaleString('en', { month: 'long' })
                          .toLowerCase(),
                    )
                    .map(emp => (
                      <div key={emp.id}>
                        <p>
                          {emp.firstName}
                          {emp.lastName}
                        </p>
                        <p>
                          {new Date(emp.dob).toLocaleString('en', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    ))}
                </Fragment>
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

EmployeesBD.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      lastName: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      dob: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export { EmployeesBD as default };
