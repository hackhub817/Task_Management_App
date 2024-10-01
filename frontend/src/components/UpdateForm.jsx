import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateForm = ({ task }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: task ? task.title : "",
    description: task ? task.description : "",
    status: task ? task.status : "To Do",
    priority: task ? task.priority : "Medium",
    dueDate: task ? task.dueDate : "",
  });

  useEffect(() => {
    const fetchTask = async () => {
      if (!task) {
        try {
          const response = await axios.get(
            `${window.location.origin}/api/tasks/${id}`,
            {
              withCredentials: true,
            }
          );
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching task:", error.response.data);
        }
      }
    };
    fetchTask();
  }, [id, task]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit behavior

    try {
      await axios.put(`${window.location.origin}/api/tasks/${id}`, formData, {
        withCredentials: true, // Ensure that cookies are sent with the request
      });
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Error updating task:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-4">Update Task</h2>

      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="title"
        >
          Task Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Task Title"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="description"
        >
          Task Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Task Description"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          rows="4"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="status"
        >
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="priority"
        >
          Priority
        </label>
        <select
          name="priority"
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: e.target.value })
          }
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Update Task
      </button>
    </form>
  );
};

export default UpdateForm;
