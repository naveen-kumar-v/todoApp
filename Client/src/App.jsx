import Todo from "./components/Todo";
import { Toaster } from "react-hot-toast";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Auth } from "./components/Auth.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/todos" element={<Todo />} />
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
