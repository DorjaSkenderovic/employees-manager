import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "../styles/Employee.module.scss";
import Button from "../../../components/Button/Button";
import EmployeeForm from "./EmployeeForm";

function Employee(props) {
  const employee = props.employee;
  const [active, setActive] = useState(false);

  const update = true;

  const handleDelete = () => {
    handleClose();
    if (parseInt(employee.todo) > 0) {
      alert(
        `Cannot delete this employee! ${employee.name} has ${employee.todo} tasks assigned.`
      );
    } else {
      deleteDoc(doc(db, "employees", employee.id)).then(() => {
        props.handleManageData();
      });
    }
  };

  const handleActive = () => {
    setActive(true);
  };
  const handleClose = () => {
    setActive(false);
  };

  return (
    <>
      {active && (
        <EmployeeForm
          onClose={handleClose}
          employeeModel={employee}
          update={update}
          teamsData={props.teamsData}
          handleManageData={props.handleManageData}
        >
          <Button onClick={handleDelete}>delete</Button>
        </EmployeeForm>
      )}

      <tr className={styles.employee} onClick={handleActive}>
        <td>{employee.name}</td>
        <td>{employee.email}</td>
        <td>{employee.phone}</td>
        <td>{employee.birthday}</td>
        <td>{employee.salary}€</td>
        <td>{employee.tasks}</td>
      </tr>
    </>
  );
}

export default Employee;
