import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detail from "./routes/details";
import Home from "./routes/home";

function App() {
  return (
    <Router>
      <div>hi</div>
      <Routes>
        {/* "/about-us" 경로로 가면 "Hello" 메시지를 렌더링 */}
        <Route path="/about-us" element={<h1>Hello</h1>} />

        {/* "/movie/:id" 경로로 가면 Detail 컴포넌트를 렌더링 */}
        <Route path="/movie/:id" element={<Detail />} />

        {/* "/" 경로로 가면 Home 컴포넌트를 렌더링 */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
