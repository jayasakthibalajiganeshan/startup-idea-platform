import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import PostIdea from "./pages/PostIdea.jsx";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <h1>Startup Idea Platform</h1>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post" element={<PostIdea />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
