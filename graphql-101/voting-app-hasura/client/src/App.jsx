import { Link, Route, Routes } from "react-router-dom";
import Questions from "./pages/Questions";
import New from "./pages/New";

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Questions</Link>
        <Link to="/new">New Question</Link>
      </nav>

      <Routes>
        <Route exact path="/" element={<Questions />} />
        <Route exact path="/new" element={<New />} />
      </Routes>
    </div>
  );
}

export default App;
