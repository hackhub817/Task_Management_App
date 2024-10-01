import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TaskList = ({ isAdmin }) => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    assignedUser: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await axios.get(`${window.location.origin}/api/tasks`, {
        withCredentials: true,
      });

      setTasks(data);
    };
    fetchTasks();
  }, [filters]);

  const handleDelete = async (id) => {
    await axios.delete(`${window.location.origin}/api/tasks/${id}`, {
      withCredentials: true,
    });
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg max-w-full overflow-x-auto">
      <h2 className="text-2xl font-bold text-white mb-4 text-center sm:text-left">
        Task List
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700 border border-gray-600 rounded-lg block md:table">
          <thead className="block md:table-header-group">
            <tr className="block md:table-row">
              <th className="px-4 py-2 text-white text-left block md:table-cell">
                Title
              </th>
              <th className="px-4 py-2 text-white text-left block md:table-cell">
                Status
              </th>
              <th className="px-4 py-2 text-white text-left block md:table-cell">
                Priority
              </th>
              <th className="px-4 py-2 text-white text-left block md:table-cell">
                Created By
              </th>
              <th className="px-4 py-2 text-white text-left block md:table-cell">
                Assigned User
              </th>
              <th className="px-4 py-2 text-white text-left block md:table-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {tasks.map((task) => (
              <tr
                key={task._id}
                className="hover:bg-gray-600 block md:table-row"
              >
                <td className="border-t border-gray-600 px-4 py-2 text-white block md:table-cell">
                  {task.title}
                </td>
                <td className="border-t border-gray-600 px-4 py-2 text-white block md:table-cell">
                  {task.status}
                </td>
                <td className="border-t border-gray-600 px-4 py-2 text-white block md:table-cell">
                  {task.priority}
                </td>
                <td className="border-t border-gray-600 px-4 py-2 text-white block md:table-cell">
                  {task.createdName}
                </td>
                <td className="border-t border-gray-600 px-4 py-2 text-white block md:table-cell">
                  {task.assignedUser ? task.assignedUser : "Unassigned"}
                </td>
                <td className="border-t border-gray-600 px-4 py-2 block md:table-cell space-y-2 md:space-y-0 md:space-x-2">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded w-full md:w-auto"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>

                  {isAdmin ? (
                    <Link to={`/assign-task/${task._id}`}>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded w-full md:w-auto">
                        Assign Task
                      </button>
                    </Link>
                  ) : null}

                  <Link to={`/edit-task/${task._id}`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded w-full md:w-auto">
                      Update Task
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
