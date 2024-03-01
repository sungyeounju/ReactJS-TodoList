import {DragDropContext,Droppable,Draggable, DropResult} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";
import DraggableCard from "./components/DraggableCard";

const Wrapper = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  height:100vh;
  max-width:640px;
  width:100%;
  margin:0 auto;
`
const Boards = styled.div`
  display:grid;
  gap:10px;
  width:100%;
  grid-template-columns:repeat(3,1fr);
`


const toDos = ["g","b","w","a","y","p"];
function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info:DropResult) => {
    console.log(info)
    const {destination, draggableId, source} = info;
    if (!destination) return;
    if(destination?.droppableId === source.droppableId){// 현재보드와 옮긴보드가 같다면
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1)
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId] : boardCopy
        };
      })
    }
    if(destination?.droppableId !== source.droppableId){
      setToDos((allBoards)=>{
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination?.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0 , taskObj)
        return {
          ...allBoards,
          [source.droppableId]:sourceBoard,
          [destination?.droppableId] : destinationBoard
        }
      })
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId)=>(
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
