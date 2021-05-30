import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Employer = ({ employer, onFindEmployerID, checkedValues }) => {
  const [state, setState] = useState(false);
  const [color, setColor] = useState(null);

  const handleChange = ({ target }) => {
    const employerExist = checkedValues.find(value => value.id === employer.id);
    target.value === 'true' ? setColor({ color: 'red' }) : setColor(null);

    if (employerExist && target.value === 'true') {
      onFindEmployerID(employer.id, target.value, target.checked);
      setState(employerExist.checkedValue);
    } else {
      onFindEmployerID(employer.id, target.value, target.checked);
      setState(false);
      setColor(null);
    }
  };

  useEffect(() => {
    const employerExist = checkedValues.find(value => value.id === employer.id);
    if (employerExist) {
      setState(employerExist.checkedValue);
      setColor({ color: employerExist.color });
    }
  }, [employer.id, checkedValues]);

  return (
    <form>
      <p
        style={color || { color: 'black' }}
      >{`${employer.lastName} ${employer.firstName}`}</p>
      <label>
        Active
        <input
          onChange={handleChange}
          checked={state}
          type="radio"
          name={employer.lastName}
          value="true"
        />
      </label>
      <label>
        Not Active
        <input
          checked={!state}
          onChange={handleChange}
          name={employer.lastName}
          type="radio"
          value="false"
        />
      </label>
    </form>
  );
};

Employer.propTypes = {
  employeer: PropTypes.objectOf({
    id: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
  }),
  onFindEmployerID: PropTypes.func,
  checkedValues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
};

export default Employer;
