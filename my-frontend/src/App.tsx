import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    fetch("http://localhost:3000/todo/createTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: value,
      }),
    })
      .then((response) => response.json())
      .then((data) => setTodos([...todos, data]))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:3000/todo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleAddTodo}>add</button>

      <ul>
        {todos.map(
          (todo: { id: number; title: string; completed: boolean }) => (
            <li key={todo.id}>{todo.title}</li>
          )
        )}
      </ul>
    </div>
  );
}

export default App;
