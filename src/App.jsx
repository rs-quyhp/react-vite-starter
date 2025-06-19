import "./App.css";
import InputToDo from "./todo/inputTodo.component";

function App() {
  return (
    <>
      <InputToDo 
        name={'quyhp'}
        age={25}
        info={{
          gender: 'male',
          address: 'DN'
        }}
      />
    </>
  );
}

export default App;
