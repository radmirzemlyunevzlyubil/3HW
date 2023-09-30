import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "",
      tasks: [],
      editingTask: "",
      editingIndex: null,
      isUpdateMode: false,
      selectedTaskId: null,
    };
  }

  onAddTask = (e) => {
    e.preventDefault();
    if (!this.state.state.trim()) {
      return;
    }

    const date = Date.now();
    this.setState((prevState) => ({
      tasks: [
        ...prevState.tasks,
        {
          id: date,
          value: prevState.state,
          isImportant: false,
        },
      ],
      state: "",
      editingTask: "",
    }));
  };

  onUpdateTask = (e) => {
    e.preventDefault();
    if (!this.state.editingTask.trim()) {
      return;
    }

    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task, index) =>
        index === prevState.editingIndex
          ? { ...task, value: prevState.editingTask }
          : task
      ),
      editingIndex: null,
      editingTask: "",
      isUpdateMode: false,
    }));
  };

  onDeleteTask = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  };

  onEditTask = (id) => {
    const taskToEdit = this.state.tasks.find((task) => task.id === id);
    if (taskToEdit) {
      this.setState({
        editingTask: taskToEdit.value,
        editingIndex: this.state.tasks.indexOf(taskToEdit),
        isUpdateMode: true,
      });
    }
  };

  render() {
    return (
      <div>
        <div>
          <form
            onSubmit={this.state.isUpdateMode ? this.onUpdateTask : this.onAddTask}
          >
            <input
              value={this.state.isUpdateMode ? this.state.editingTask : this.state.state}
              onChange={(event) =>
                this.setState({
                  [this.state.isUpdateMode ? "editingTask" : "state"]: event.target.value,
                })
              }
              type="text"
              placeholder="type something..."
            />
            <button>{this.state.isUpdateMode ? "Update" : "Add"}</button>
          </form>
        </div>

        <div>
          <ul>
            {this.state.tasks.map((item) => (
              <li key={item.id}>
                <h3
                  style={{
                    color:
                      this.state.selectedTaskId === item.id
                        ? "green"
                        : item.isImportant
                        ? "green"
                        : "black",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (this.state.selectedTaskId === item.id) {
                      this.setState({ selectedTaskId: null });
                    } else {
                      this.setState({ selectedTaskId: item.id });
                    }
                  }}
                >
                  {item.value}
                </h3>
                <button onClick={() => this.onDeleteTask(item.id)}>delete</button>
                <button onClick={() => this.onEditTask(item.id)}>edit</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
