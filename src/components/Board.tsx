import { info } from "console";
import { Droppable } from "react-beautiful-dnd";
import { styled } from "styled-components";
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
interface IAreaProps{
  isDraggingFromThis:boolean;
  isDraggingOver:boolean;
}
interface IBoardProps{
  toDos : string [];
  boardId : string;
}
function Board({toDos, boardId}:IBoardProps){
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
      {(magic,info) => (
        <Area
          isDraggingOver={info.isDraggingOver}
          isDraggingFromThis={Boolean(info.draggingFromThisWith)}
          ref={magic.innerRef}
          {...magic.droppableProps}
        >
          {toDos.map((toDo, index) => (            
            <DraggableCard key={toDo} index={index} toDo={toDo}  />
          ))}
          {magic.placeholder}
        </Area>
      )}
      </Droppable>
    </Wrapper>
  )
}
export default Board;