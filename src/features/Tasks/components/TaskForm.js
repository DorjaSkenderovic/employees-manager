import { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "../styles/TaskForm.module.scss";
import Modal from "../../../components/Modal/Modal";
import Button from "../../../components/Button/Button";
import { CForm, CFormInput, CFormSelect, CFormTextarea } from "@coreui/react";

const TaskForm = (props) => {
  const [taskInput, setTaskInput] = useState(props.taskModel);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().slice(0, 10);
  const currEmployee = props.taskModel.employee;

  const options = props.taskModel.employee
    ? [
        props.employeesData.find(
          (employee) => employee.id === props.taskModel.employee
        )?.name,
      ]
    : [""];

  props.employeesData.forEach((employee) => {
    options.push({
      value: employee.id,
      label: employee.name,
    });
  });

  const handleChange = (event) => {
    setTaskInput({
      ...taskInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    updateDoc(doc(db, "tasks", props.taskModel.id), taskInput);
    if (currEmployee !== taskInput.employee) {
      const currTodo =
        parseInt(
          props.employeesData.find((employee) => employee.id === currEmployee)
            ?.todo
        ) - 1;
      updateDoc(doc(db, "employees", currEmployee), {
        todo: currTodo,
      });

      const newTodo =
        parseInt(
          props.employeesData.find(
            (employee) => employee.id === taskInput.employee
          )?.todo
        ) + 1;
      updateDoc(doc(db, "employees", taskInput.employee), { todo: newTodo });
    }
    props.handleManageData();
    props.onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addDoc(collection(db, "tasks"), taskInput);

    const todo =
      parseInt(
        props.employeesData.find(
          (employee) => employee.id === taskInput.employee
        )?.todo
      ) + 1;

    updateDoc(doc(db, "employees", taskInput.employee), { todo: todo });

    props.handleManageData();
    props.onClose();
  };

  const handleFinish = () => {
    const todo =
      parseInt(
        props.employeesData.find(
          (employee) => employee.id === taskInput.employee
        )?.todo
      ) - 1;

    updateDoc(doc(db, "employees", props.taskModel.employee), { todo: todo });

    const tasks =
      parseInt(
        props.employeesData.find(
          (employee) => employee.id === props.taskModel.employee
        )?.tasks
      ) + 1;

    setDoc(
      doc(db, "employees", props.taskModel.employee),
      { tasks: tasks },
      { merge: true }
    );

    deleteDoc(doc(db, "tasks", props.task)).then(() => {
      props.handleManageData();
      props.onClose();
    });
  };

  return (
    <Modal>
      {props.update && (
        <Button className={styles.finish} onClick={handleFinish}>
          FINISH TASK
        </Button>
      )}
      <CForm
        className={styles.form}
        onSubmit={handleSubmit}
        style={{
          width: "80%",
        }}
      >
        <CFormInput
          type="text"
          name="title"
          floatingLabel="Title:"
          value={taskInput.title}
          onChange={handleChange}
          required
        />
        <CFormInput
          type="date"
          name="due_date"
          min={minDate}
          floatingLabel="Due Date:"
          value={taskInput.due_date}
          onChange={handleChange}
          required
        />
        <CFormSelect
          style={{
            height: "4rem",
          }}
          floatingLabel="Assign to:"
          name="employee"
          options={options}
          onChange={handleChange}
          required
        />
        <CFormTextarea
          style={{
            height: "10rem",
          }}
          name="description"
          floatingLabel="Description:"
          rows={5}
          value={taskInput.description}
          onChange={handleChange}
          required
        ></CFormTextarea>
        <div className={styles.buttons}>
          {props.children}
          {props.insert && <Button type="submit">submit</Button>}
          {props.update && <Button onClick={handleUpdate}>update</Button>}
          <Button onClick={props.onClose}>close</Button>
        </div>
      </CForm>
    </Modal>
  );
};

export default TaskForm;
