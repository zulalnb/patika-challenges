import { Route, Routes } from "react-router-dom";
import { Col, Row } from "antd";

import Home from "pages/Home";

function App() {
  return (
    <div>
      <Row justify="center">
        <Col span={14}>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Col>
      </Row>
    </div>
  );
}

export default App;
