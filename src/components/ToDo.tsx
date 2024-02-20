import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "./atoms";

function ToDo({text, category, id}:IToDo){
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos)=>{
      const targetIndex = oldToDos.findIndex((todo) => todo.id === id);
      const newTodo = {text, id, category:name as any};
      return [
        ...oldToDos.slice(0,targetIndex),
        newTodo,
        ...oldToDos.slice(targetIndex+1),
      ];
    })
  } 
  return (
    <li>
      {text}
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "TODO" && (
        <button name="TODO" onClick={onClick}>
          todo
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          done
        </button>
      )}
    </li>
  );
}
export default ToDo; 