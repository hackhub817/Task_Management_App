import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginFom";
import Dashboard from "./components/Dashboard";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import AssignTask from "./components/AssignTask";
import UpdateForm from "./components/UpdateForm";

const App = () => {
  const isAdmin = true;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/create-task" element={<TaskForm />} />
        <Route path="/edit-task/:id" element={<UpdateForm />} />
        <Route path="/assign-task/:id" element={<AssignTask />} />
      </Routes>
    </Router>
  );
};

export default App;
