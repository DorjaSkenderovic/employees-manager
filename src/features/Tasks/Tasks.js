import { useState } from "react";
import styles from "./styles/Tasks.module.scss";
import Button from "../../components/Button/Button";
import Task from "./components/Task";
import TaskForm from "./components/TaskForm";

const Tasks = (props) => {
  const [active, setActive] = useState(false);

  const taskModel = {
    title: "",
    due_date: "",
    description: "",
    employee: "",
  };

  const insert = true;

  const handleActive = () => {
    setActive(true);
  };
  const handleClose = () => {
    setActive(false);
  };

  const taskRow = props.tasksData.map((task, key) => (
    <Task
      key={key}
      task={task}
      employeesData={props.employeesData}
      handleManageData={props.handleManageData}
    />
  ));

  return (
    <div className={styles.task}>
      <Button onClick={handleActive}>Add Task</Button>
      {active && (
        <TaskForm
          onClose={handleClose}
          employeesData={props.employeesData}
          taskModel={taskModel}
          insert={insert}
          handleManageData={props.handleManageData}
        />
      )}
      {props.loading && <p>loading...</p>}
      {props.tasksData.length > 0 && taskRow}
    </div>
  );
};

export default Tasks;
