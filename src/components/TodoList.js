import React from "react";

function TodoList(props) {
  const { _id, task, completed } = props.todo;
  return (
    <tr
      key={_id}
      className={completed ? "" : "table-active"}
      style={{ cursor: "pointer" }}
      onClick={props.onClick}
      onDoubleClick={props.onDoubleClick}
    >
      <td>{task}</td>
      <td>{completed ? "Done." : "Pending"}</td>
    </tr>
  );
}

export default TodoList;
