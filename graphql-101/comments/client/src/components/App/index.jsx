import { Route, Routes } from "react-router-dom";
import { Col, Row } from "antd";
import styles from "./styles.module.css";

import Home from "pages/Home";
import NewPost from "pages/NewPost";
import Post from "pages/Post";
import HeaderMenu from "./HeaderMenu";

function App() {
  return (
    <div className={styles.container}>
      <Row justify="center">
        <Col span={14}>
          <HeaderMenu />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={14} className={styles.content}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/new" element={<NewPost />} />
          </Routes>
        </Col>
      </Row>
    </div>
  );
}

export default App;
