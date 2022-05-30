import Todo from "./components/Todo";

function App() {
  return (
    <div className="container">
      <p className="h2 mt-3 display-5">
        Good day, {process.env.REACT_APP_USER}!
      </p>
      <Todo />
    </div>
  );
}

export default App;
