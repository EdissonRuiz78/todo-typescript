import React, { useState, useRef } from "react";
import { Itask } from "../App";

interface Error {
  state: boolean;
  message: string;
}

type FormEvent = React.FormEvent<HTMLFormElement>;

const Form: React.SFC = () => {
  const [newTask, newsetTask] = useState<string>("");
  const [tasks, setTasks] = useState<Itask[]>([]);
  const [error, setError] = useState<Error>({
    state: false,
    message: "",
  });
  const taskInput = useRef<HTMLInputElement>(null);

  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (newTask === "") {
      setError({
        state: true,
        message: "Task name is required",
      });
      return;
    }
    setError({
      state: false,
      message: "",
    });
    addTask(newTask);
    newsetTask("");
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTask: Itask[] = [...tasks, { name, done: false }];
    setTasks(newTask);
  };

  const handleOnChange = (index: number): void => {
    const newTask: Itask[] = [...tasks];
    newTask[index].done = !newTask[index].done;
    setTasks(newTask);
  };

  const handleOnDelete = (index: number): void => {
    const newTask: Itask[] = [...tasks];
    newTask.splice(index, 1);
    setTasks(newTask);
  };

  return (
    <div className="form-group">
      <form onSubmit={handleOnSubmit}>
        <input
          className="form-control"
          type="text"
          value={newTask}
          placeholder="Type a new task"
          autoFocus
          ref={taskInput}
          onChange={(e) => newsetTask(e.target.value)}
        />
        <button className="btn btn-secondary btn-block mt-2" type="submit">
          Add Task
        </button>
      </form>
      {error.state ? (
        <p className="alert alert-danger text-center mt-2">{error.message}</p>
      ) : null}
      {tasks.map((task: Itask, index: number) => (
        <div className="card mt-2" key={index}>
          <div className="card-body">
            <h2>{task.name}</h2>
            <button
              className="btn btn-sm btn-info m-2"
              type="button"
              onClick={() => handleOnChange(index)}
            >
              {task.done ? "COMPLETE" : "INCOMPLETE"}
            </button>
            <button
              className="btn btn-sm btn-danger"
              type="button"
              onClick={() => handleOnDelete(index)}
            >
              DELETE
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Form;
