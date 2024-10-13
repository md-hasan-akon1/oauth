import mongoose, { Schema } from "mongoose";
import { ICompletedTask, ITask } from "./task.interface";

// Mongoose Schema
const itemSchema: Schema = new Schema(
    {
      avatar: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
        trim: true,
      },
      title: {
        type: String,
        required: true,
        trim: true,
      },
      detail: {
        type: String,
        required: true,
        trim: true,
      },
      subTitle: {
        type: String,
        required: true,
        trim: true,
      },
      points: {
        type: Number,
        required: true,
        default: 0,
      },
      userLevel: {
        type: Number,
        required: true,
        default: 1,
      },
    },
    {
      timestamps: true, // This automatically adds `createdAt` and `updatedAt`
    }
  );
  
  // Export the model
 export const Task = mongoose.model<ITask>('task', itemSchema);





 const completedTaskSchema: Schema = new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Reference to User collection
        required: true,
      },
      taskId: {
        type: Schema.Types.ObjectId,
        ref: 'Task',  // Reference to Task collection
        required: true,
      }
    },
    {
      timestamps: true,  // Automatically manages `createdAt` and `updatedAt`
    }
  );
  
  // Export the model
  const CompletedTask = mongoose.model<ICompletedTask>('CompletedTask', completedTaskSchema);
  
  export default CompletedTask;