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
  min-height:200px;
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
background-color:${(props) =>
  props.isDraggingOver ? "pink" : props.isDraggingFromThis ? "red" : "blue"};
`
const Form = styled.form`
  width:100%;
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