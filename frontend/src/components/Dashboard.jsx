import React, { useState, useEffect } from "react";
import LoginForm from "./LoginFom";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import TaskList from "./TaskList";

const Dashboard = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem("jwt");
  console.log("tokdfen", token);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("jwt");
      navigate("/login");
    } catch (error) {
      console.error(
        "Error logging out:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      {!token ? (
        <LoginForm />
      ) : (
        <>
          <div className="flex gap-4 sm:gap-8 lg:gap-12 flex-end justify-end sm:p-6 p-4">
            <Link to="/create-task">
              <div className="text-sm sm:text-lg lg:text-xl text-white font-semibold hover:text-gray-300 hover:shadow-xl">
                Assign Task
              </div>
            </Link>
            <Link to="/create-task">
              <div className="text-sm sm:text-lg lg:text-xl text-white font-semibold hover:text-gray-300 hover:shadow-xl">
                tasks
              </div>
            </Link>
            <div
              className="text-sm sm:text-lg lg:text-xl text-white font-semibold hover:text-gray-300 hover:shadow-xl cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
          <section className="relative flex flex-col items-center justify-between ">
            <h1>Welcome</h1>
            <TaskList isAdmin={true} />
          </section>
        </>
      )}
    </>
  );
};

export default Dashboard;
