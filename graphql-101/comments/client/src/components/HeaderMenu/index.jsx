import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import styles from "./styles.module.css";

function HeaderMenu() {
  const location = useLocation();

  const items = [
    {
      key: "/",
      label: <Link to="/">Home</Link>,
    },
    {
      key: "/new",
      label: <Link to="/new">New</Link>,
    },
  ];

  return (
    <Menu
      mode="horizontal"
      selectedKeys={location.pathname}
      className={styles.headerMenu}
      items={items}
    />
  );
}

export default HeaderMenu;
