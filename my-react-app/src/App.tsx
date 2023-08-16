import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTodo, removeTodo, addTodo, changeTodo } from "./features/todosSlice";
import { AppDispatch, RootState } from "./app/store";

function App() {
  const todos = useSelector((state: RootState) => state.todos);


  const [text, setText] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    
      e.preventDefault();
      dispatch(addTodo(text))
      setText("");
    
  };

const handleRemove =(id: number) => {
 dispatch(removeTodo(id));
}

const handleChangeComplete = (id: string, completed: boolean): void => {
  dispatch(changeTodo({id, completed}))

}

  useEffect(() => {
    dispatch(fetchTodo());
  }, []);

  // if (error){
  //   return <h1>{error}</h1>
  // }
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={handleChange} />
        <button type="submit" disabled={!text}>add </button>
      </form>
      <ul>
        {
          todos.map((todo) => {
           
              return (
                <li className="t" key={todo._id}>
                  <input onClick = {() => handleChangeComplete(todo._id, todo.completed)} checked={todo.completed} type='checkbox'></input>
                  <span className={todo.completed ? "f" : "r"}>
                    {todo.text}
                  </span>
                  <button onClick={() => handleRemove(todo._id)}>x</button>
                </li>
              );
            })}
      </ul>
    </div>
  );
}

export default App
