import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";


interface IToDo{
  text:string;
  category: "TODO"|"Doing"|"Done";
  id:number;
}
interface IForm{
  toDo:string;
}
const toDoState = atom<IToDo[]>({
  key : "toDo",
  default:[],
})
function ToDoList(){
  const [toDos, setToDos] = useRecoilState(toDoState)
  const {register,handleSubmit,setValue} = useForm<IForm>();
  const handleValid = ({toDo}:IForm) => {
    setToDos(oldToDos => [{text:toDo,id:Date.now(), category:"TODO"},...oldToDos])
    setValue("toDo","")
  }
  return(
    <div>
      <h1>ToDo List</h1>
      <form onSubmit={handleSubmit(handleValid)}>
        <input 
          {...register("toDo",{
            required:"please write to do"
          })}
          placeholder="write to do"
        />
        <button>ADD</button>
      </form>
      <ul>
        {toDos.map((toDo)=>(
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  )
}
export default ToDoList;