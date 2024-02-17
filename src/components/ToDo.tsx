import { IToDo } from "./atoms";

function ToDo({text}:IToDo){
    return <li>
        {text}
        <button>Doing</button>
        <button>todo</button>
        <button>done</button>
        </li>;
}
export default ToDo; 