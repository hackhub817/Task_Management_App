import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AssignTask = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(""); // Store the user's name
  const { id } = useParams(); // Task ID from the URL

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get("http://localhost:5000/api/auth/users", {
        withCredentials: true, // Ensure that cookies are sent with the request
      });
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleAssign = async () => {
    if (selectedUser) {
      try {
        // Find the user by name to get their _id for assigning the task
        const user = users.find((user) => user.username === selectedUser);

        if (user) {
          await axios.patch(
            `http://localhost:5000/api/tasks/${id}/assign`,
            {
              assignedUser: user.username, // Use the user ID for assigning the task
            },
            {
              withCredentials: true, // Ensure that cookies are sent with the request
            }
          );
          alert("Task assigned successfully");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error assigning task:", error);
      }
    } else {
      alert("Please select a user to assign the task");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-6">Assign Task</h2>

      <div className="mb-4">
        <label
          htmlFor="assign-user"
          className="block text-lg font-medium mb-2 text-gray-300"
        >
          Select User
        </label>
        <select
          id="assign-user"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)} // Set user's name here
          className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user.username}>
              {" "}
              {/* Use username */}
              {user.username}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAssign}
        className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Assign Task
      </button>
    </div>
  );
};

export default AssignTask;
