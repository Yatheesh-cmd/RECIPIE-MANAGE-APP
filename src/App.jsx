import { useState } from "react";
import Add from "./components/Add";
import List from "./components/List";

function App() {
  const [success, setSuccess] = useState("");

  return (
    <>
      <nav className="navbar s1 navbar-expand navbar-light navbar-success bg-info" >
        <a href="" className="navbar-brand  s2 border-5 text-light">
           Recipe Management
        </a>
      </nav>
      <div className="container-fluid" style={{ minHeight: "100vh",  backgroundColor: "white" }}>
        <Add val={setSuccess} />
        <List success={success} />
      </div>
    </>
  );
}

export default App;

