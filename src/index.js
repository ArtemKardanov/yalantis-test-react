import styles from './index.module.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
