import React from "react";
import TodoForm from "./todoForm";

const EditTodo = (props) => {
  return <TodoForm isNew={false} id={props.match.params.id} />;
};

export default EditTodo;
