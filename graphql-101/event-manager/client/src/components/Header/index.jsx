import { Col, Row } from "antd";
import { Typography } from "antd";
import styles from "./styles.module.css";

const { Title } = Typography;

function Header() {
  return (
    <Row justify="center" className={styles["header-container"]}>
      <Col>
        <Title>Event Sync</Title>
      </Col>
    </Row>
  );
}

export default Header;
