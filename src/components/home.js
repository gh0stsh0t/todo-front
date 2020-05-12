import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Todo = ({
  description,
  responsible,
  priority,
  completed = false,
  _id,
}) => {
  const className = completed ? "completed" : "";
  return (
    <tr>
      <td className={className}>{description}</td>
      <td className={className}>{responsible}</td>
      <td className={className}>{priority}</td>
      <td>
        <Link to={`/edit/${_id}`}>Edit</Link>
      </td>
    </tr>
  );
};

const Home = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const { REACT_APP_HOST, REACT_APP_PORT } = process.env;
    axios
      .get(`http://${REACT_APP_HOST}:${REACT_APP_PORT}/todos/`)
      .then((res) => {
        setTodos(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  return (
    <>
      <h3>Todos List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Responsible</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((currentTodo, i) => {
            return <Todo {...currentTodo} key={i} />;
          })}
        </tbody>
      </table>
    </>
  );
};
export default Home;
