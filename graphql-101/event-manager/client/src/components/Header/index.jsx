import { Link } from "react-router-dom";
import { Col, Row, Typography } from "antd";
import styles from "./styles.module.css";

const { Title } = Typography;

function Header() {
  return (
    <Row justify="center" className={styles["header-container"]}>
      <Link to="/">
        <Col>
          <Title>Event Sync</Title>
        </Col>
      </Link>
    </Row>
  );
}

export default Header;
