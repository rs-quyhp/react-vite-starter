interface IProps {
  age: number;
  name: string;
  info: {
    gender: string;
    address: string;
  };
}

const InputToDo = (abc: IProps) => {
  const { name, age, info } = abc;

  const handleClick = () => {
    alert("saved");
  };
  return (
    <div>
      <div>
        <span>
          Name: {name}, age: {age}, info: {JSON.stringify(info)}
        </span>
      </div>
      <span>Add new todo</span>
      <div>
        <input
          type="text"
          onChange={(event) => {
            console.log(event.target.value);
          }}
        />
        &nbsp; &nbsp;
        <button onClick={() => handleClick()}>Save</button>
      </div>
    </div>
  );
};

export default InputToDo;
