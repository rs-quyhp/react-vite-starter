import "./App.css";
import InputToDo from "./todo/inputTodo.component";

function App() {
  const todoList = ["Todo 1", "Todo 2", "Todo 3", "Todo 4", "Todo 5"];

  return (
    <>
      <InputToDo
        name={"quyhp"}
        age={25}
        info={{
          gender: "male",
          address: "DN",
        }}
      />

      <ul>
        {todoList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
