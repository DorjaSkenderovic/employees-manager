import { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "../styles/Task.module.scss";
import Card from "../../../components/Card/Card";
import Button from "../../../components/Button/Button";
import TaskForm from "./TaskForm";

const Task = (props) => {
  const task = props.task;
  const date = task.due_date;
  const update = true;
  const [active, setActive] = useState(false);

  const handleDelete = () => {
    const todo =
      parseInt(
        props.employeesData.find((employee) => employee.id === task.employee)
          ?.todo
      ) - 1;

    updateDoc(doc(db, "employees", task.employee), { todo: todo });

    deleteDoc(doc(db, "tasks", task.id)).then(() => {
      props.handleManageData();
      handleClose();
    });
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
        <TaskForm
          onClose={handleClose}
          taskModel={task}
          task={task.id}
          update={update}
          employeesData={props.employeesData}
          handleManageData={props.handleManageData}
        >
          <Button onClick={handleDelete}>delete</Button>
        </TaskForm>
      )}
      <Card className={styles.taskCard} onClick={handleActive}>
        <div className={styles.about}>
          <Card className={styles.date}>
            <div className={styles.month}>{date.substring(5, 7)}</div>
            <div className={styles.day}>{date.substring(8)}</div>
            <div className={styles.year}>{date.substring(0, 4)}</div>
          </Card>
          <div className={styles.info}>
            <div>
              Task name:<h3>{task.title}</h3>
            </div>
            <div>
              Assigned to:
              <h4>
                {
                  props.employeesData.find(
                    (employee) => employee.id === task.employee
                  )?.name
                }
              </h4>
            </div>
          </div>
        </div>
        <div className={styles.description}>
          <p>Description:</p>
          {task.description}
        </div>
      </Card>
    </>
  );
};

export default Task;
