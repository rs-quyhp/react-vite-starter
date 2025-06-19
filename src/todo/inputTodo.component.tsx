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

  return (
    <div>
      <div>
        <span>
          Name: {name}, age: {age}, info: {JSON.stringify(info)}
        </span>
      </div>
      <span>Add new todo</span>
      <div>
        <input type="text" />
        &nbsp; &nbsp;
        <button>Save</button>
      </div>
    </div>
  );
};

export default InputToDo;
