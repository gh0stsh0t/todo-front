import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

const CheckBoxes = (props) => {
  const { value, currValue, setValue } = props;
  return (
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="radio"
        name="priorityOptions"
        id={`priority${value}`}
        value={value}
        checked={currValue === value}
        onChange={(e) => setValue(e.target.value)}
      />
      <label className="form-check-label">{value}</label>
    </div>
  );
};

const TodoForm = ({ history, isNew = true, id = "" }) => {
  const [description, setDescription] = useState("");
  const [responsible, setResponsible] = useState("");
  const [priority, setPriority] = useState("");
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    const { REACT_APP_HOST, REACT_APP_PORT } = process.env;
    axios
      .get(`http://${REACT_APP_HOST}:${REACT_APP_PORT}/todos/${id}`)
      .then((res) => {
        const { data } = res;
        setDescription(data.description || "");
        setResponsible(data.responsible || "");
        setPriority(data.priority || "");
        setCompleted(data.completed || false);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [id]);
  const submit = (e) => {
    e.preventDefault();
    const { REACT_APP_HOST, REACT_APP_PORT } = process.env;
    const postfix = isNew ? "add" : `update/${id}`;
    axios
      .post(`http://${REACT_APP_HOST}:${REACT_APP_PORT}/todos/${postfix}`, {
        description,
        responsible,
        priority,
        completed,
      })
      .then((res) => {
        if (!isNew) {
          history.push("/");
        } else {
          setDescription("");
          setResponsible("");
          setPriority("");
          setCompleted("");
        }
      });
  };
  const action = isNew ? "Create New Todo" : "Update Todo";
  return (
    <div style={{ marginTop: 10 }}>
      <h3>{action}</h3>
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Responsible: </label>
          <input
            type="text"
            className="form-control"
            value={responsible}
            onChange={(e) => setResponsible(e.target.value)}
          />
        </div>
        <div className="form-group">
          <CheckBoxes value="Low" currValue={priority} setValue={setPriority} />
          <CheckBoxes
            value="Medium"
            currValue={priority}
            setValue={setPriority}
          />
          <CheckBoxes
            value="High"
            currValue={priority}
            setValue={setPriority}
          />
        </div>
        {!isNew && (
          <div className="form-check">
            <input
              className="form-check-input"
              id="completedCheckbox"
              type="checkbox"
              name="completedCheckbox"
              onChange={() => setCompleted(!completed)}
              checked={completed}
              value={completed}
            />
            <label className="form-check-label" htmlFor="completedCheckbox">
              Completed
            </label>
          </div>
        )}

        <div className="form-group">
          <input type="submit" value={action} className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};
export default withRouter(TodoForm);
