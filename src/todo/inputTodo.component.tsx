import { useState } from "react";

interface IProps {
  age: number;
  name: string;
  info: {
    gender: string;
    address: string;
  };
}

const InputToDo = (abc: IProps) => {
  const [todoName, setTodoName] = useState("My Todo");
  const [listTodo, setListTodo] = useState(["Todo 1"]);

  const handleClick = () => {
    if (!todoName) {
      alert("Empty todo name");
      return;
    }
    setListTodo([...listTodo, todoName]);
    setTodoName("");
  };
  return (
    <div>
      <span>Add new todo</span>
      <div>
        <input
          type="text"
          value={todoName}
          onChange={(event) => {
            setTodoName(event.target.value);
          }}
        />
        &nbsp; &nbsp;
        <button onClick={() => handleClick()}>Save</button>
      </div>
      <ul>
        {listTodo.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default InputToDo;
