import styles from "./styles/Top.module.scss";
import Card from "../../components/Card/Card";

const Top = (props) => {
  const topEmployees = props.employeesData
    .sort((a, b) => b.pastTasks - a.pastTasks)
    .slice(0, 5);

  const top = topEmployees.map((employee, key) => (
    <tr key={key} className={styles.list}>
      <td>{employee.name}</td>
      <td>{employee.email}</td>
      <td>{employee.phone}</td>
      <td>{employee.birthday}</td>
      <td>{employee.salary}€</td>
      <td>{employee.pastTasks}</td>
    </tr>
  ));
  return (
    <div className={styles.top}>
      <Card className={styles.display}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Birthday</th>
              <th>Salary</th>
              <th>Finished Tasks</th>
            </tr>
          </thead>
          <tbody>{top}</tbody>
        </table>
      </Card>
    </div>
  );
};

export default Top;
