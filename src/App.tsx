import React from "react";
import Form from "./components/Form";

export interface Itask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-12 col-md-6">
          <h1 className="text-center">Create and Manage tasks</h1>
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;
