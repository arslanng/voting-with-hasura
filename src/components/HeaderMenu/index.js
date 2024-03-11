import React from "react";
import { Menu } from "antd";
import styles from "./styles.module.css";
import { Link, useLocation } from "react-router-dom";

const items = [
  {
    label: (
      <Link to="/" className={styles.menuItem}>
        Home
      </Link>
    ),
    key: "/",
  },
  {
    label: (
      <Link to="/new" className={styles.menuItem}>
        New
      </Link>
    ),
    key: "/new",
  },
];

function HeaderMenu() {
  const location = useLocation(); // açık olan sayfanın bilgisini verir.
  return (
    <Menu
      mode="horizontal"
      items={items}
      className={styles.headerMenu}
      selectedKeys={location.pathname}
    />
  );
}

export default HeaderMenu;
