import { useState } from "react";
import { addDoc, updateDoc, collection, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "../styles/EmployeeForm.module.scss";
import Modal from "../../../components/Modal/Modal";
import Button from "../../../components/Button/Button";
import { CForm, CFormInput, CFormSelect } from "@coreui/react";

const EmployeeForm = (props) => {
  const [employeeInput, setEmployeeInput] = useState(props.employeeModel);

  const options = props.employeeModel.team
    ? [
        props.teamsData.find((team) => team.id === props.employeeModel.team)
          ?.name,
      ]
    : [""];

  props.teamsData.forEach((team) => {
    options.push({
      value: team.id,
      label: team.name,
    });
  });

  const handleChange = (event) => {
    setEmployeeInput({
      ...employeeInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    updateDoc(doc(db, "employees", props.employeeModel.id), employeeInput);
    props.handleManageData();
    props.onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(collection(db, "employees"), {
      ...employeeInput,
      tasks: "0",
      pastTasks: "0",
      todo: "0",
      timestamp: new Date(),
    });
    props.handleManageData();
    props.onClose();
  };

  return (
    <Modal>
      <CForm
        className={styles.form}
        onSubmit={handleSubmit}
        style={{
          width: "80%",
        }}
      >
        <CFormInput
          type="text"
          name="name"
          floatingLabel="Name:"
          value={employeeInput.name}
          onChange={handleChange}
          required
          pattern="\S+( +\S+)+"
          title="Enter full name"
        />
        <CFormSelect
          style={{
            height: "4rem",
          }}
          floatingLabel="Team:"
          name="team"
          options={options}
          onChange={handleChange}
          required
        />

        <CFormInput
          name="email"
          type="email"
          floatingLabel="Email:"
          value={employeeInput.email}
          onChange={handleChange}
          required
        />
        <CFormInput
          name="phone"
          type="tel"
          floatingLabel="Phone:"
          value={employeeInput.phone}
          onChange={handleChange}
          required
        />
        <CFormInput
          name="birthday"
          type="date"
          min="1907-03-04"
          max="2008-03-04"
          floatingLabel="Birthday:"
          value={employeeInput.birthday}
          onChange={handleChange}
          required
        />
        <CFormInput
          name="salary"
          type="number"
          floatingLabel="Salary:"
          value={employeeInput.salary}
          onChange={handleChange}
          required
        />
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

export default EmployeeForm;
