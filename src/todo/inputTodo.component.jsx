const InputToDo = (abc) => {
  return (
    <div>
      <div>
        <span>Name: {abc.name}, age: {abc.age}, info: {JSON.stringify(abc.info)}</span>
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
