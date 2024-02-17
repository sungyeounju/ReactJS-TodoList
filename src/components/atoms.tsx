import { atom } from "recoil";
export interface IToDo{
  text:string;
  category: "TODO"|"Doing"|"Done";
  id:number;
}
export const toDoState = atom<IToDo[]>({
  key : "toDo",
  default:[],
})