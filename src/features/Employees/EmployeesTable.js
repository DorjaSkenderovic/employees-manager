import { useState } from "react";
import styles from "./styles/EmployeesTable.module.scss";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Employee from "./components/Employee";
import EmployeeForm from "./components/EmployeeForm";

function EmployeesTable(props) {
  const [active, setActive] = useState(false);

  const insert = true;

  const employeeModel = {
    name: "",
    team: "",
    email: "",
    phone: "",
    birthday: "",
    salary: "",
  };

  const handleActive = () => {
    setActive(true);
  };
  const handleClose = () => {
    setActive(false);
  };

  const employeeRow = props.employeesData.map((employee, key) => (
    <Employee
      key={key}
      employee={employee}
      teamsData={props.teamsData}
      handleManageData={props.handleManageData}
    />
  ));

  return (
    <div className={styles.employeesTable}>
      <Button onClick={handleActive}>Add Employee</Button>
      {active && (
        <EmployeeForm
          onClose={handleClose}
          employeeModel={employeeModel}
          insert={insert}
          handleManageData={props.handleManageData}
          teamsData={props.teamsData}
        />
      )}
      <Card className={styles.tableCard}>
        <table>
          {props.employeesData.length === 0 ? (
            <thead>
              <tr>
                <th>No Employees</th>
              </tr>
            </thead>
          ) : (
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Birthday</th>
                <th>Salary</th>
                <th>This Month Tasks</th>
              </tr>
            </thead>
          )}
          <tbody>
            {props.loading && (
              <tr>
                <td>loading...</td>
              </tr>
            )}
            {props.employeesData.length > 0 && employeeRow}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default EmployeesTable;
