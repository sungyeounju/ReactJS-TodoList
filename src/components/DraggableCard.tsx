import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "styled-components";
const Card = styled.div`
  margin-bottom:5px;  
  padding:10px;
  border-radius:5px;
  background-color:${(props) => (props.theme.cardColor)}
`
interface IDragabbleCardProps{
    toDo : string;
    index: number;
}
function DraggableCard({toDo, index}:IDragabbleCardProps){
    return (
    <Draggable draggableId={toDo} index={index}>
    {(magic) => (
      <Card ref={magic.innerRef}
      {...magic.draggableProps}
      {...magic.dragHandleProps}>
        {toDo}
      </Card>
    )}
  </Draggable> 
    );
}
export default React.memo(DraggableCard);