import KanbanBoard from "./components/Board";

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskDetails from "./components/TaskDetails";

const initialTasks = {
  "Not started": [
    { id: "1", title: "Card 1", description: "" },
    { id: "2", title: "Card 2", description: "" },
    { id: "3", title: "Card 3", description: "" },
  ],
  "In progress": [{ id: "4", title: "Card 4", description: "" }],
  Completed: [{ id: "5", title: "Card 5", description: "" }],
};

function App() {
  // Initializing state with localStorage or initial tasks
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("kanban-tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  // Effect to save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<KanbanBoard tasks={tasks} setTasks={setTasks} />}
          />
          <Route
            path="/task/:id"
            element={<TaskDetails tasks={tasks} setTasks={setTasks} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
