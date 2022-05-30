import axios from "axios";
import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const fetchAll = () => {
    axios
      .get("http://127.0.0.1:3001/api/v1/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.log(error.message));
  };

  const createTodo = (event) => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:3001/api/v1/todos", { task: input })
      .then((response) => setTodos([...todos, response.data]));
    setInput("");
  };

  const markAsComplete = (todo) => {
    axios
      .patch(`http://127.0.0.1:3001/api/v1/todos/${todo._id}`)
      .then((response) => {
        setTodos(
          todos.map((todo) =>
            todo._id === response.data._id ? response.data : todo
          )
        );
      });
  };

  const deleteTodo = (todo) => {
    axios
      .delete(`http://127.0.0.1:3001/api/v1/todos/${todo._id}`)
      .then((response) => {
        setTodos(todos.filter((t) => t._id !== response.data.data._id));
      });
  };

  useEffect(fetchAll, []);

  return (
    <>
      <form onSubmit={createTodo}>
        <input
          className="form-control"
          placeholder="Add new task"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </form>
      <hr />
      <small className="text-muted display-6">Your todo tasks are:</small>
      <div className="h4">
        <span className="mt-1 badge bg-info text-dark">
          {todos.length <= 0 ? "No Todo tasks found." : ""}
        </span>
      </div>
      <table className="mt-3 table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Task</th>
            <th scope="col">Status</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <TodoList
              key={todo._id}
              todo={todo}
              onClick={() => markAsComplete(todo)}
              onDoubleClick={() => deleteTodo(todo)}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Todo;
