import { info } from "console";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { ITodo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  min-height:300px;
  padding:20px 10px;
  border-radius:5px;
  background-color:${(props)=>(props.theme.boardColor)}
`
const Title = styled.strong`
  display:block;
  margin-bottom:10px;
  text-align:center;
  font-size:20px;
`
const Area = styled.div<IAreaProps>`
flex-grow:1;
border-radius:3px;
background-color:${(props) =>
  props.isDraggingOver ? "#ececec" : props.isDraggingFromThis ? "#c7cbd2" : "#DADFE9"};
`
const Form = styled.form`
  display:flex;
  width:100%;
  input{
    width:100%;
    padding:3px 10px;
    min-height:30px;
    border:none;
    border-radius:3px;
    margin-bottom:5px;
  }
`

interface IAreaProps{
  isDraggingFromThis:boolean;
  isDraggingOver:boolean;
}
interface IBoardProps{
  toDos : ITodo [];
  boardId : string;
}
interface IForm{
  toDo:string ;
}
function Board({toDos, boardId}:IBoardProps){
  const setToDos = useSetRecoilState(toDoState);
  const {register,setValue, handleSubmit} = useForm<IForm>();
  const onValid = ({toDo}:IForm) => {
    const newToDo = {
      id : Date.now(),
      text : toDo
    }
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]:[newToDo, ...allBoards[boardId]]
      }
    })
    setValue("toDo","");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo", {required:true})} type="text" placeholder={`add task on ${boardId}`} />
      </Form>
      <Droppable droppableId={boardId}>
      {(magic,info) => (
        <Area
          isDraggingOver={info.isDraggingOver}
          isDraggingFromThis={Boolean(info.draggingFromThisWith)}
          ref={magic.innerRef}
          {...magic.droppableProps}
        >
          {toDos.map((toDo, index) => (            
            <DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text}  />
          ))}
          {magic.placeholder}
        </Area>
      )}
      </Droppable>
    </Wrapper>
  )
}
export default Board;