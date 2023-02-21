import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import UpdateTask from "./components/UpdateTask";

import Footer from "./components/Footer";
import Favorite from "./components/Favorite";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register setShowLogin={setShowLogin} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Tasks" element={<Tasks />} />
        <Route path="/AddTask" element={<AddTask />} />
        <Route path="/UpdateTask" element={<UpdateTask />} />
        <Route path="/favorite" element={<Favorite/>} />
      </Routes>
    </div>
  );
}

export default App;
