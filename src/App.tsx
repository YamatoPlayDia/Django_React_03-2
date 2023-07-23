import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Note from "./Note";
import Comments from "./Comments";  // Assuming that you have this file

function App() {
  return (
    <Router>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/note/:id" element={<Note />} />
      <Route path="/note/:id/comments" element={<Comments />} />
    </Router>
  );
}

export default App;
