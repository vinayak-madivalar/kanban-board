import { Link } from "react-router-dom";

const KanbanBoard = ({ tasks, setTasks }) => {
  const onDragStart = (e, taskId, sourceColumn) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("sourceColumn", sourceColumn);
  };

  const onDrop = (e, destColumn) => {
    const taskId = e.dataTransfer.getData("taskId");
    const sourceColumn = e.dataTransfer.getData("sourceColumn");

    if (sourceColumn === destColumn) return;

    const sourceTasks = [...tasks[sourceColumn]];
    const destTasks = [...tasks[destColumn]];

    const task = sourceTasks.find((task) => task.id === taskId);
    const updatedSourceTasks = sourceTasks.filter((task) => task.id !== taskId);

    setTasks((prevState) => ({
      ...prevState,
      [sourceColumn]: updatedSourceTasks,
      [destColumn]: [...destTasks, task],
    }));
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const addTask = (status) => {
    const newTaskTitle = prompt("Enter task title:");
    if (newTaskTitle) {
      const newTask = { id: Date.now().toString(), title: newTaskTitle };
      setTasks((prevState) => ({
        ...prevState,
        [status]: [...prevState[status], newTask],
      }));
    }
  };

  const renderTasks = (tasks, column) => {
    return tasks.map((task) => (
      <Link
        key={task.id}
        to={`/task/${task.id}`}
        className="bg-white p-2 rounded shadow border font-medium border-gray-300 mb-2 block"
        draggable
        onDragStart={(e) => onDragStart(e, task.id, column)}
      >
        {task.title}
      </Link>
    ));
  };

  return (
    <div className="flex justify-center items-start p-4">
      {Object.keys(tasks).map((column, index) => (
        <div
          key={index}
          className="w-1/4 "
          onDrop={(e) => onDrop(e, column)}
          onDragOver={allowDrop}
        >
          <div className=" p-2 rounded">
            <div className="flex justify-between items-start">
              <div className="flex justify-between gap-4 items-baseline">
                <h2
                  style={{
                    backgroundColor: `${
                      index === 0
                        ? "#ffccd1"
                        : index === 1
                        ? "#fbeecc"
                        : "#cce7e1"
                    }`,
                  }}
                  className="mb-3  px-2 rounded-sm"
                >
                  {column}
                </h2>
                <div className="text-gray-400">{tasks[column].length}</div>
              </div>

              <button
                onClick={() => addTask(column)}
                className="text-gray-400 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              {renderTasks(tasks[column], column)}
            </div>
            <button
              onClick={() => addTask(column)}
              className="text-gray-400 flex items-center gap-1 py-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              New
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
