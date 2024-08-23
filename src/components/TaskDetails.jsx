import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TaskDetails = ({ tasks, setTasks }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    let foundTask = null;
    let foundStatus = "";

    for (const key in tasks) {
      const taskInList = tasks[key]?.find((task) => task.id === id);
      if (taskInList) {
        foundTask = taskInList;
        foundStatus = key;
        break;
      }
    }

    if (foundTask) {
      setTask(foundTask);
      setStatus(foundStatus);
      setTitle(foundTask.title);
      setDescription(foundTask.description || "");
    }
  }, [id, tasks]);

  const handleSave = () => {
    const updatedTask = { ...task, title, description };

    setTasks((prevState) => {
      const updatedTasks = { ...prevState };

      // Remove task from current status list
      updatedTasks[status] = updatedTasks[status].filter(
        (t) => t.id !== task.id
      );

      // Add task to new status list
      updatedTasks[status] = [...updatedTasks[status], updatedTask];

      return updatedTasks;
    });

    navigate("/");
  };

  const handleDelete = () => {
    setTasks((prevState) => {
      const updatedTasks = { ...prevState };
      updatedTasks[status] = updatedTasks[status].filter(
        (t) => t.id !== task.id
      );
      return updatedTasks;
    });
    navigate("/");
  };

  const handleStatusChange = (newStatus) => {
    setTasks((prevState) => {
      const updatedTasks = { ...prevState };

      // Remove task from current status list
      updatedTasks[status] = updatedTasks[status].filter(
        (t) => t.id !== task.id
      );

      // Update the task's status
      const updatedTask = { ...task, title, description };

      // Add task to new status list
      updatedTasks[newStatus] = [...updatedTasks[newStatus], updatedTask];

      return updatedTasks;
    });

    setStatus(newStatus);
  };

  if (!task) return <div>Task not found</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Task Details</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
          rows="4"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Status:</label>
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        >
          {Object.keys(tasks).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Save
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
