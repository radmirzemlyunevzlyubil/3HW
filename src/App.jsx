import React, { useState } from "react";
import "./App.css";

function App() {
  const [state, setState] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const onAddTask = (e) => {
    e.preventDefault();
    if (!state.trim()) {
      return;
    }

    const date = Date.now();
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: date,
        value: state,
        isImportant: false,
      },
    ]);

    setState("");
    setEditingTask("");
  };

  const onUpdateTask = (e) => {
    e.preventDefault();
    if (!editingTask.trim()) {
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((task, index) =>
        index === editingIndex ? { ...task, value: editingTask } : task
      )
    );

    setEditingIndex(null);
    setEditingTask("");
    setIsUpdateMode(false);
  };

  const onDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const onEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setEditingTask(taskToEdit.value);
      setEditingIndex(tasks.indexOf(taskToEdit));
      setIsUpdateMode(true);
    }
  };


  return (
    <div>
      <div>
        <form onSubmit={isUpdateMode ? onUpdateTask : onAddTask}>
          <input
            value={isUpdateMode ? editingTask : state}
            onChange={(event) =>
              isUpdateMode
                ? setEditingTask(event.target.value)
                : setState(event.target.value)
            }
            type="text"
            placeholder="type something..."
          />
          <button>{isUpdateMode ? "Update" : "Add"}</button>
        </form>
      </div>

      <div>
        <ul>
          {tasks.map((item) => (
            <li key={item.id}>
              <h3
                style={{
                  color:
                    selectedTaskId === item.id
                      ? "green"
                      : item.isImportant
                      ? "green"
                      : "black",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (selectedTaskId === item.id) {
                    setSelectedTaskId(null);
                  } else {
                    setSelectedTaskId(item.id);
                  }
                }}
              >
                {item.value}
              </h3>
              <button onClick={() => onDeleteTask(item.id)}>delete</button>
              <button onClick={() => onEditTask(item.id)}>edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;