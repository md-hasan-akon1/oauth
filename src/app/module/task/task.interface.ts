import { Schema, Types } from "mongoose";

export interface ITask{
    avatar:string,
    cetagory:string,
    title:string
    subTile:string,
    points:number,
    detail:string,
    userLevel:number,
    createdAt: Date;
    updatedAt: Date;

}
export interface ICompletedTask{
   userId:Types.ObjectId,
   taskId:Types.ObjectId,
    createdAt: Date;
    updatedAt: Date;

}