import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Note from "./Note";
import Comments from "./Comments";  // Assuming that you have this file
import Signup from "./Signup";
import Logout from "./Logout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/note/" element={<Note />} />
        <Route path="/note/:id/comments" element={<Comments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
