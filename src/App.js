import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
import { Navbar } from "./components/Navbar/Navbar";
import EmployeesTable from "./features/Employees/EmployeesTable";
import Tasks from "./features/Tasks/Tasks";
import Teams from "./features/Teams/Teams";
import Top from "./features/Top/Top";

function App() {
  const [loading, setLoading] = useState(false);
  const [manageData, setManageData] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const employeesArray = [];
    const tasksArray = [];
    const teamsArray = [];
    const now = new Date();
    const isFirstOfMonth = now.getDate() === 1;
    const isPastMidnight =
      now.getHours() === 0 &&
      now.getMinutes() === 0 &&
      now.getSeconds() === 0 &&
      now.getMilliseconds() === 0;

    const snapshotEmployees = await getDocs(
      query(collection(db, "employees"), orderBy("timestamp", "asc"))
    );

    const snapshotTasks = await getDocs(
      query(collection(db, "tasks"), orderBy("due_date", "asc"))
    );

    const snapshotTeams = await getDocs(query(collection(db, "teams")));

    snapshotEmployees.docs.forEach((employee) => {
      employeesArray.push({
        id: employee.id,
        ...employee.data(),
      });

      const data = employee.data();

      if (isFirstOfMonth && isPastMidnight) {
        updateDoc(doc(db, "employees", employee.id), {
          pastTasks: data.tasks,
          tasks: 0,
        });
      }
    });

    snapshotTasks.docs.forEach((task) => {
      tasksArray.push({
        id: task.id,
        ...task.data(),
      });
      const data = task.data();
      const today = new Date().toLocaleDateString("en-CA");
     
      if (today === data.due_date) {
        deleteDoc(doc(db, "tasks", task.id));
      }
    });

    snapshotTeams.docs.forEach((team) => {
      teamsArray.push({
        id: team.id,
        ...team.data(),
      });
    });
    setEmployeesData([...employeesArray]);
    setTasksData([...tasksArray]);
    setTeamsData([...teamsArray]);

    setLoading(false);
  };

  const handleManageData = () => {
    setManageData(!manageData);
  };

  useEffect(() => {
    fetchData();
  }, [manageData]);

  const groupedEmployees = employeesData.reduce((acc, employee) => {
    const { team } = employee;
    if (!acc[team]) {
      acc[team] = [];
    }
    acc[team].push(employee);
    return acc;
  }, {});

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/employees-manager"
          element={
            <Tasks
              employeesData={employeesData}
              tasksData={tasksData}
              loading={loading}
              handleManageData={handleManageData}
            />
          }
        />
        <Route
          path="/employees"
          element={
            <EmployeesTable
              employeesData={employeesData}
              loading={loading}
              handleManageData={handleManageData}
              teamsData={teamsData}
            />
          }
        />
        <Route
          path="/teams"
          element={
            <Teams
              teamsData={teamsData}
              employeesData={employeesData}
              loading={loading}
              groupedEmployees={groupedEmployees}
            />
          }
        />
        <Route path="/top" element={<Top employeesData={employeesData} />} />
      </Routes>
    </Router>
  );
}

export default App;
