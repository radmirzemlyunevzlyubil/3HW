import React, { Component } from "react";
import "./App.css";

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingTask: props.text || "", // Устанавливаем начальное значение из пропсов
      editingIndex: null,
      isUpdateMode: false,
    };
  }

  onUpdateTask = (e) => {
    e.preventDefault();
    if (!this.state.editingTask.trim()) {
      return;
    }

    this.props.onUpdateTask(this.state.editingTask, this.state.editingIndex);

    this.setState({
      editingIndex: null,
      editingTask: "",
      isUpdateMode: false,
    });
  };

  render() {
    return (
      <form onSubmit={this.state.isUpdateMode ? this.onUpdateTask : this.props.onAddTask}>
        <input
          value={this.state.isUpdateMode ? this.state.editingTask : this.props.text} // Используем this.props.text для отображения текста
          onChange={(event) =>
            this.setState({
              [this.state.isUpdateMode ? "editingTask" : "text"]: event.target.value,
            })
          }
          type="text"
          placeholder="type something..."
        />
        <button>{this.state.isUpdateMode ? "Update" : "Add"}</button>
      </form>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "",
      tasks: [],
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
    }));
  };

  onUpdateTask = (editingTask, editingIndex) => {
    if (!editingTask.trim()) {
      return;
    }

    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task, index) =>
        index === editingIndex ? { ...task, value: editingTask } : task
      ),
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
      this.textEditorRef.setState({
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
          <TextEditor
            ref={(ref) => (this.textEditorRef = ref)}
            text={this.state.state}
            onAddTask={this.onAddTask}
            onUpdateTask={this.onUpdateTask}
          />
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
