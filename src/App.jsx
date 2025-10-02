import { useState, useEffect } from "react";
function App() {
  //Load States
  const [inputTask, setInputTask] = useState("");
  const [id, setId] = useState(0);

  //Get save tasks from local storage values
  const [tasks, setTasks] = useState(() => {
    const storedTask = localStorage.getItem("tasks");

    return storedTask !== null ? JSON.parse(storedTask) : [];
  });

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputTask.trim()) return;
    setTasks([...tasks, { id: id, task: inputTask, done: false }]);

    setId(id + 1);

    setInputTask("");
  };

  const isTaskDone = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => (t && t.id === taskId ? { ...t, done: !t.done } : t))
    );

    setTimeout(() => {
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    }, 2000);
  };

  const listTasks = tasks.map((t) => (
    <li className={t.done ? "line-through" : "text-2xl"} key={t.id}>
      <input
        type="checkbox"
        checked={t.done}
        onChange={() => isTaskDone(t.id)}
      />{" "}
      {t.task}
    </li>
  ));

  return (
    <>
      <div className="card">
        <h1 className="text-center font-bold text-4xl mb-6">Todo App</h1>
        <div className="ml-8">
          <form onSubmit={handleSubmit}>
            <input
              value={inputTask}
              onChange={(e) => setInputTask(e.target.value)}
              type="text"
              placeholder="Enter Task"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button
              type="submit"
              className="p-1 border border-black bg-blue-600 rounded-md ml-2"
            >
              Add task
            </button>
          </form>
        </div>

        <div className="mt-5 ml-6">
          <ul>{listTasks}</ul>
        </div>
      </div>
    </>
  );
}

export default App;
