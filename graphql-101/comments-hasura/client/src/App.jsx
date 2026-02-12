import { Route, Routes } from "react-router-dom";
import { Col, Row } from "antd";

import Home from "pages/Home";
import Event from "pages/Event";
import Header from "components/Header";

function App() {
  return (
    <div>
      <Header />
      <Row justify="center">
        <Col span={14}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/event/:id" element={<Event />} />
          </Routes>
        </Col>
      </Row>
    </div>
  );
}

export default App;
