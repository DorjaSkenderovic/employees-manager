import { useState } from "react";
import styles from "./styles/Teams.module.scss";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { PieChart, Pie, Cell, Legend } from 'recharts';

const Teams = (props) => {
  const [teamFilter, setTeamFilter] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const handleTeamFilter = (teamId) => {
    const employeesInTeam = props.employeesData.filter(
      (employee) => employee.team === teamId
    );
    setFilteredEmployees(employeesInTeam);
    setTeamFilter(teamId);
  };

  const pieData = Object.entries(props.groupedEmployees).map(([teamId, employees]) => {
    const teamName = props.teamsData.find(team => team.id === teamId)?.name;
    return {
      name: teamName,
      value: employees.length,
    };
  });


  const smallestTeams = pieData.sort((a, b) => a.value - b.value).slice(0, 3);
  console.log(smallestTeams);

  const colors = ['#d64a6e', '#B0D0D3', '#FFCAD4', '#FF8042'];


  return (
    <div className={styles.teams}>
      <PieChart width={400} height={400}>
        <Pie data={pieData} dataKey="value" label="value" nameKey="name" cx="50%" cy="50%" outerRadius={150}>
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
      <div>
        <div className={styles.buttons}>
          {props.teamsData.map((team) => (
            <Button
              className={styles.button}
              key={team.id}
              onClick={() => handleTeamFilter(team.id)}
            >
              {team.name}
            </Button>
          ))}
        </div>

        {teamFilter && (
          <Card className={styles.employeesList}>
            <h2>
              {props.teamsData.find((team) => team.id === teamFilter).name}{" "}
              Employees:
            </h2>
            <ul>
              {filteredEmployees.map((employee) => (
                <li key={employee.id}>{employee.name}</li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Teams;
