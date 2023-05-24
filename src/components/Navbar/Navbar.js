import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import { NavLink, Outlet } from "react-router-dom";
import BurgerMenuIcon from "./BurgerMenuIcon";

export const Navbar = () => {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.navbar}>
      <h1 className={styles.title}>Employees Manager</h1>
      <div className={styles.toggleButton} onClick={() => setActive(!active)}>
        <BurgerMenuIcon />
      </div>
      <div className={active ? styles.navItemsMobile : styles.navItems}>
        <NavLink
          onClick={() => setActive(false)}
          to="/"
          className={({ isActive }) =>
            isActive ? styles.navActive : styles.navItem
          }
        >
          tasks
        </NavLink>
        <NavLink
          onClick={() => setActive(false)}
          to="/employees"
          className={({ isActive }) =>
            isActive ? styles.navActive : styles.navItem
          }
        >
          employees
        </NavLink>
        <NavLink
          onClick={() => setActive(false)}
          to="/teams"
          className={({ isActive }) =>
            isActive ? styles.navActive : styles.navItem
          }
        >
          teams
        </NavLink>
        <NavLink
          onClick={() => setActive(false)}
          to="/top"
          className={({ isActive }) =>
            isActive ? styles.navActive : styles.navItem
          }
        >
          top
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};
