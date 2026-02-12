import { Link, Route, Routes } from "react-router-dom";
import Questions from "./pages/Questions";
import NewQuestion from "./pages/New";
import Detail from "./pages/Detail";

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Questions</Link>
        <Link to="/new">New Question</Link>
      </nav>
      <hr />
      <Routes>
        <Route exact path="/" element={<Questions />} />
        <Route exact path="/new" element={<NewQuestion />} />
        <Route exact path="q/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
