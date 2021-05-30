import styles from './index.module.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import EmployeesPage from './pages/EmployeesPage';

const App = () => (
  <div className={styles.container}>
    <EmployeesPage />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

// const App = () => (
//   <div className={styles.container}>
//     <Switch>
//       <Route path="/" exact>
//         <Link to="/employees">Employees</Link>
//       </Route>
//       <Route path="/employees">
//         <EmployeesPage />
//       </Route>
//     </Switch>
//   </div>
// );

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById('root'),
// );
